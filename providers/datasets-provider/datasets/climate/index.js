import era5 from "./era5";
import rainfallEstimates from "./rainfall-estimates";

import projections from "./projections";

const datasets = [
  ...rainfallEstimates.datasets,
  ...era5.datasets,
  ...projections.datasets,
];

const updates = [
  ...rainfallEstimates.updates,
  ...era5.updates,
  ...projections.updates,
];

export default { datasets, updates };
