import weather from "./weather";
import climate from "./climate";
import agriculture from "./agriculture";
import alerts from "./alerts";
import environment from "./environment";
import satellite from "./satellite";

import exposure from "./exposure";

const allDatasets = [
  ...alerts.datasets,
  ...satellite.datasets,
  ...weather.datasets,
  ...climate.datasets,
  ...agriculture.datasets,
  ...environment.datasets,
  ...exposure.datasets,
];

export const layersUpdateProviders = [
  ...alerts.updates,
  ...weather.updates,
  ...satellite.updates,
  ...climate.updates,
  ...agriculture.updates,
  ...environment.updates,
];

export default allDatasets;
