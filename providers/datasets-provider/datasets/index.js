import boundaries from "./boundaries";
import weather from "./weather";
import climate from "./climate";
import foodSecurity from "./food-security";
import alerts from "./alerts";
import environment from "./environment";

import exposure from "./exposure";
import { isFunction } from "lodash";

const allDatasets = [
  ...boundaries,
  ...alerts.datasets,
  ...weather.datasets,
  ...climate.datasets,
  ...foodSecurity,
  ...environment,
  ...exposure,
];

export const layersUpdateProviders = [
  ...alerts.updates,
  ...weather.updates,
  ...climate.updates,
];

const datasetsWithLayers = allDatasets.filter(
  (d) =>
    (d.layers && !!d.layers.length) || (d.getLayers && isFunction(d.getLayers))
);

export const localDatasets = datasetsWithLayers.filter((d) => !d.getLayers);

// datasets that need to initialize layers from a remote source
export const asyncDatasets = datasetsWithLayers.filter(
  (d) => d.getLayers && isFunction(d.getLayers)
);
