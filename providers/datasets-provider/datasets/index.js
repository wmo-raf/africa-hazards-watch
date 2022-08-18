import boundaries from "./boundaries";
import foodSecurity from "./food-security";
import forecast from "./forecast";
import climate from "./climate";

import exposure from "./exposure";
import { isFunction } from "lodash";

const allDatasets = [
  ...boundaries,
  ...foodSecurity,
  ...exposure,
  ...forecast,
  ...climate,
];

export const localDatasets = allDatasets.filter((d) => !d.getLayers);

// datasets that need to initialize layers from a remote source
export const asyncDatasets = allDatasets.filter(
  (d) => d.getLayers && isFunction(d.getLayers)
);
