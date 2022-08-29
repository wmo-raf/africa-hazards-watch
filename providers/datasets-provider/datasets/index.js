import boundaries from "./boundaries";
import weather from "./weather";
import climate from "./climate";
import foodSecurity from "./food-security";
import alerts from "./alerts";

import exposure from "./exposure";
import { isFunction } from "lodash";

const allDatasets = [
  ...boundaries,
  ...weather,
  ...climate,
  ...foodSecurity,
  ...exposure,
  ...alerts,
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
