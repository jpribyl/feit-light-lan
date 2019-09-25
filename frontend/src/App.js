import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import PresetPicker from "./components/PresetPicker";
import ColorPicker from "./components/ColorPicker";
import CurrentSelection from "./components/CurrentSelection";
import SideBar from "./components/SideBar";
import WhitePicker from "./components/WhitePicker";
import Presets from "./components/PresetPicker/presets";
import routes from "./routes";

const apiBase = "http://192.168.1.190:3333";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      on: false,
      //hex: "#60ff60",
      hex: "#ffffff",
      day: true,
      mode: "white",
      saturation: 0.5,
      brightness: 0.15,
      index: 1,
      presets: false,
      temp: 0.2
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.sunrise-sunset.org/json?lat=45.6770&lng=-111.0429&formatted=0"
      )
      .then(res => {
        const sunrise = new Date(res.data.results.sunrise);
        const sunset = new Date(res.data.results.sunset);
        const now = new Date();
        const day = sunrise < now && sunset > now;
        this.setState({ day: day });
      });
  }

  toggleOn = (brightness, event) => {
    this.setState({ on: !this.state.on }, () => {
      axios.post(apiBase + "/light", { ...this.state });
    });
  };

  handleHueChange = (color, event) => {
    this.setState({ mode: "colour", hex: color.hex }, () => {
      axios.post(apiBase + "/light", { ...this.state });
    });
  };

  handleSaturationChange = value => {
    this.setState({ mode: "colour", saturation: value / 100 }, () => {
      axios.post(apiBase + "/light", { ...this.state });
    });
  };

  handleBrightnessChange = value => {
    this.setState({ brightness: value / 100 }, () => {
      axios.post(apiBase + "/light", { ...this.state });
    });
  };

  handleTempChange = value => {
    this.setState({ hex: "#ffffff", mode: "white", temp: value / 100 }, () => {
      axios.post(apiBase + "/light", { ...this.state });
    });
  };

  _setIndex = e => {
    this.setState({ on: false, index: e.index });
  };

  render() {
    const { on, index, day, temp, hex, saturation, brightness } = this.state;

    const white = (
      <>
        <h1 style={{ marginBottom: "-10px" }}> SET WHITE </h1>
        <WhitePicker
          temp={temp}
          brightness={brightness}
          handleBrightnessChange={this.handleBrightnessChange}
          handleTempChange={this.handleTempChange}
        />
      </>
    );

    const color = (
      <>
        <h1 style={{ marginTop: "-10px" }}> SET COLOR </h1>
        <ColorPicker
          brightness={brightness}
          color={hex}
          saturation={saturation}
          handleBrightnessChange={this.handleBrightnessChange}
          handleHueChange={this.handleHueChange}
          handleSaturationChange={this.handleSaturationChange}
        />
      </>
    );
    return (
      <div
        className="App"
        style={
          {
            //width: "100%",
            //position: "fixed"
            //overflowY: "hidden"
          }
        }
      >
        <SideBar activeIndex={index} links={routes} action={this._setIndex} />
        <header className="App-header">
          <CurrentSelection toggleOn={this.toggleOn} on={on} hex={hex} />
          {day ? (
            <>
              {white}
              {color}
            </>
          ) : (
            <>
              {color}
              {white}
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
