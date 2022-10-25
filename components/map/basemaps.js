import defaultImage from "./images/default.png";
import darkImage from "./images/dark.png";
import satelliteImage from "./images/satellite.png";

export default {
  default: {
    label: "default",
    value: "default",
    baseStyle: true,
    backgroundColor: "#A2DFFF",
    image: defaultImage,
    hasSettings: false,
    basemapGroup: "basemap-light",
    labelsGroup: "labels-light",
    mapStyle: "http://197.254.13.228:8082/styles/eahw/style.json",
  },
  dark: {
    label: "dark matter",
    value: "dark",
    color: "#31312F",
    baseStyle: true,
    image: darkImage,
    hasSettings: false,
    basemapGroup: "basemap-dark",
    labelsGroup: "labels-dark",
    mapStyle: "http://197.254.13.228:8082/styles/eahw/style.json",
  },
  satellite: {
    label: "satellite",
    description: "Highest resolution imagery 1-3 years old (global)",
    value: "satellite",
    color: "#131620",
    baseStyle: true,
    hasSettings: false,
    infoModal: "satellite_basemap",
    image: satelliteImage,
    basemapGroup: "basemap-satellite",
    labelsGroup: "labels-dark",
    mapStyle: "http://197.254.13.228:8082/styles/eahw/style.json",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  },
};
