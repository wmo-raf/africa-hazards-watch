import nrtSatellite from "./nrt-satellite";

import gfsForecast from "./gfs";
import ecmwfOpenDataForecast from "./ecmwf-opendata";

import observations from "./observations";

export default [
  ...gfsForecast,
  ...ecmwfOpenDataForecast,
  ...nrtSatellite,
  ...observations,
];
