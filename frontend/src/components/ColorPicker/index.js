import React, { useState } from "react";
import { HuePicker } from "react-color";
import Slider from "rc-slider";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const SliderTooltip = createSliderWithTooltip(Slider);

const ColorPicker = props => {
  const [hex, setHex] = useState(props.color);
  const _handleHueChange = (color, event) => {
    setHex(color.hex);
    props.handleHueChange(color, hex);
  };

  return (
    <>
      <h1 style={{ marginTop: "-20px" }}>Hue</h1>
      <HuePicker
        color={hex}
        onChangeComplete={_handleHueChange}
        height="40px"
        width="80%"
      />

      <h1>Saturation</h1>
      <SliderTooltip
        style={{ width: "80%", marginTop: "-20px" }}
        max={100}
        className="slider animationSpeedSlider"
        defaultValue={props.saturation * 100}
        onAfterChange={props.handleSaturationChange}
      />
      <h1>Brightness</h1>
      <SliderTooltip
        style={{ width: "80%", marginTop: "-20px", marginBottom: "30px" }}
        max={100}
        className="slider animationSpeedSlider"
        defaultValue={props.brightness * 100}
        onAfterChange={props.handleBrightnessChange}
      />
    </>
  );
};

export default ColorPicker;
