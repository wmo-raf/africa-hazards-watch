import opticalDepthForecast from "./optical-depth-forecast";
import surfaceConcentration from "./surface-concentration";

const datasets = [
  ...opticalDepthForecast.datasets,
  ...surfaceConcentration.datasets,
];

const updates = [
  ...opticalDepthForecast.updates,
  ...surfaceConcentration.updates,
];

export default { datasets, updates };
