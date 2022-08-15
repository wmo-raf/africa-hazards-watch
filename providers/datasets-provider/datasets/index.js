import boundaries from "./boundaries";
import foodSecurity from "./food-security";
import forecast from "./forecast";
import climate from "./climate";

import exposure from "./exposure";

export const localDatasets = [...boundaries, ...foodSecurity, ...exposure];

export const asyncDatasets = [...forecast, ...climate];
