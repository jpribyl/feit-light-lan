import React from "react";
import { CirclePicker } from "react-color";
import Presets from "./presets";

const PresetPicker = props => {
  //const handlePresetChange = value => {
  //const newState = {
  //on: true,
  //hex: value.hex,
  //saturation: Presets[value.hex].saturation,
  //brightness: Presets[value.hex].brightness,
  //mode: Presets[value.hex].mode
  //};
  //this.setState({ ...newState }, () => {
  //axios.post(apiBase + "/light", { ...this.state });
  //});
  //};

  return (
    <>
      <h1 style={{ marginTop: "-20px" }}>Presets</h1>
      <div style={{ marginLeft: "6%" }}>
        <CirclePicker
          circleSize={50}
          circleSpacing={20}
          width="100%"
          colors={Object.keys(Presets)}
          onChange={props.handlePresetChange}
        />
      </div>
    </>
  );
};

export default PresetPicker;
