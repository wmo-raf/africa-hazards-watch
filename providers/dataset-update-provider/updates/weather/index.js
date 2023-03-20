import gfsForecastUpdates from "./gfs";
import synopObservation from "./observations";
import nrtSatellite from "./nrt-satellite";
import ecmwfOpendata from "./ecmwf-opendata";

export default [
  ...ecmwfOpendata,
  ...gfsForecastUpdates,
  ...synopObservation,
  ...nrtSatellite,
];
