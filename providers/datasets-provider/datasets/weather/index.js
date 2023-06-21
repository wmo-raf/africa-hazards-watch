import gfsForecast from "./gfs";
import ecmwfOpenDataForecast from "./ecmwf-opendata";

import ecwmfObservations from "./ecwmf-observations";

const datasets = [
  ...gfsForecast.datasets,
  ...ecmwfOpenDataForecast.datasets,
  ...ecwmfObservations.datasets,
];

const updates = [
  ...gfsForecast.updates,
  ...ecmwfOpenDataForecast.updates,
  ...ecwmfObservations.updates,
];

export default { datasets, updates };
