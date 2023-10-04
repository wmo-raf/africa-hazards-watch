import gfsForecast from "./gfs";
import ecmwfOpenDataForecast from "./ecmwf-opendata";
import ecmwfHighres from "./ecmwf-highres";

import ecwmfObservations from "./ecwmf-observations";

import rsmcDarEsSalaam from "./rsmc-dar-es-salaam";

const datasets = [
  ...gfsForecast.datasets,
  ...ecmwfOpenDataForecast.datasets,
  ...ecwmfObservations.datasets,
  ...ecmwfHighres.datasets,
  ...rsmcDarEsSalaam.datasets,
];

const updates = [
  ...gfsForecast.updates,
  ...ecmwfOpenDataForecast.updates,
  ...ecwmfObservations.updates,
  ...ecmwfHighres.updates,
  ...rsmcDarEsSalaam.updates,
];

export default { datasets, updates };
