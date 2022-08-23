import boundaries from "./boundaries";
import weather from "./weather";
import climate from "./climate";
import foodSecurity from "./food-security";

import exposure from "./exposure";
import { isFunction } from "lodash";

const allDatasets = [
  ...boundaries,
  ...weather,
  ...climate,
  ...foodSecurity,
  ...exposure,
];

export const localDatasets = allDatasets.filter((d) => !d.getLayers);

// datasets that need to initialize layers from a remote source
export const asyncDatasets = allDatasets.filter(
  (d) => d.getLayers && isFunction(d.getLayers)
);
