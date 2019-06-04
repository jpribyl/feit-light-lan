'use strict';
const config = use('Config');
const TuyAPI = require('tuyapi');

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

class LightController {
  async store({request, response}) {
    try {
      let { hex, brightness, saturation, mode, temp, on, index} = request.all()

      let rgb = hexToRgb(hex)
      let hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
      hsv[1] = saturation
      hsv[2] = brightness

      rgb = hsvToRgb(hsv[0], hsv[1], hsv[2])
      hex = rgbToHex(rgb[0], rgb[1], rgb[2]).split('.')[0] + '00000000'

      let whiteBright = Math.floor(((255-25)*brightness) + 25)
      let whiteTemp = Math.floor((255)*temp)
      
      const device = new TuyAPI({...config.get('app.lights')[index]});
      await device.find();
      await device.connect();

      if (on === false) {
        device.set({multiple: true, data: {'1': on}})
      } else {
          device.set({
            multiple: true,
            data: {
              '1': true,
              '2': mode,
              '3': whiteBright,
              '4': whiteTemp,
              '5': hex
            }
          });
      }

      device.disconnect();
        return {hello: 'world'};
    } catch (e) {
        console.log(e);
        return {hello: e};
    }
  }
}

module.exports = LightController;
