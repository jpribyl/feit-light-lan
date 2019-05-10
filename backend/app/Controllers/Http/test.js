const TuyAPI = require('tuyapi');
const config = require('./config.js');
console.log(config);

const device = new TuyAPI({...config.lights[0]});

let stateHasChanged = false;

(async () => {
  await device.find();

  await device.connect();

  let status = await device.get({schema: true});

  //await device.set({
  //multiple: true,
  //data: {
  //'1': true,
  //'2': 'colour',
  //'5': '05030900000000',
  //}
  //});

  await device.set({
    multiple: true,
    data: {
      '1': true,
      '2': 'white',
      '3': 25,
      '4': 75
    }
  });
    console.log('done');

  //await device.set({
  //multiple: true,
  //data: {
  //'1': true,
  //'2': 'colour',
  //'5': '6A40BF00000000',
  //}
  //});

  device.disconnect();
})();
