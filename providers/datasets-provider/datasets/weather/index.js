import gfsForecast from "./gfs";
import ecmwfOpenDataForecast from "./ecmwf-opendata";

import observations from "./observations";

const datasets = [
  ...gfsForecast.datasets,
  ...ecmwfOpenDataForecast.datasets,
  ...observations.datasets,
];

const updates = [
  ...gfsForecast.updates,
  ...ecmwfOpenDataForecast.updates,
  ...observations.updates,
];

export default { datasets, updates };
