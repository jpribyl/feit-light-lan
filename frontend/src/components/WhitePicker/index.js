import React from "react";
import Slider from "rc-slider";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const SliderTooltip = createSliderWithTooltip(Slider);

const ColorPicker = props => {
  return (
    <>
      <h1>Temperature</h1>
      <SliderTooltip
        style={{ width: "80%", marginTop: "15px" }}
        max={100}
        className="slider animationSpeedSlider"
        onAfterChange={props.handleTempChange}
        defaultValue={props.temp * 100}
      />
      <h1>Brightness</h1>
      <SliderTooltip
        style={{ width: "80%", marginTop: "10px", marginBottom: "30px" }}
        max={100}
        className="slider animationSpeedSlider"
        defaultValue={props.brightness * 100}
        onAfterChange={props.handleBrightnessChange}
      />
    </>
  );
};

export default ColorPicker;
