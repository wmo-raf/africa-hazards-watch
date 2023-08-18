import gfsForecast from "./gfs";
import ecmwfOpenDataForecast from "./ecmwf-opendata";
import ecmwfHighres from "./ecmwf-highres";

import ecwmfObservations from "./ecwmf-observations";

const datasets = [
  ...gfsForecast.datasets,
  ...ecmwfOpenDataForecast.datasets,
  ...ecwmfObservations.datasets,
  ...ecmwfHighres.datasets,
];

const updates = [
  ...gfsForecast.updates,
  ...ecmwfOpenDataForecast.updates,
  ...ecwmfObservations.updates,
  ...ecmwfHighres.updates,
];

export default { datasets, updates };
