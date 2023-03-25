import gfsForecast from "./gfs";
import ecmwfOpenDataForecast from "./ecmwf-opendata";
import nrtSatellite from "./nrt-satellite";
import observations from "./observations";

const datasets = [
  ...gfsForecast.datasets,
  ...ecmwfOpenDataForecast.datasets,
  ...nrtSatellite.datasets,
  ...observations.datasets,
];

const updates = [
  ...gfsForecast.updates,
  ...ecmwfOpenDataForecast.updates,
  ...nrtSatellite.updates,
  ...observations.updates,
];

export default { datasets, updates };
