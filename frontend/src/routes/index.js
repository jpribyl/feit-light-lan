import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStore, faLightbulb } from "@fortawesome/free-solid-svg-icons";
library.add(faStore, faLightbulb);
const style = {
  marginTop: "50px",
  marginBottom: "10px",
  fontSize: "30pt"
};
const routes = [
  {
    name: "br-ceiling",
    active: false,
    index: 0,
    icon: <FontAwesomeIcon style={style} icon="store" />
  },
  {
    name: "br-lamp",
    active: true,
    index: 1,
    icon: <FontAwesomeIcon style={style} icon="lightbulb" />
  }
];

export default routes;
