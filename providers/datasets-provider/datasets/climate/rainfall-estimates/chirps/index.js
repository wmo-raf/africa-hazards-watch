import chirpsRainfallEstimate from "./monthly-chirps-rainfall-estimate";
import chirpsRainfallAnomaly from "./monthly-chirps-rainfall-anomaly";

const datasets = [
  ...chirpsRainfallEstimate.datasets,
  ...chirpsRainfallAnomaly.datasets,
];

const updates = [
  ...chirpsRainfallEstimate.updates,
  ...chirpsRainfallAnomaly.updates,
];

export default { datasets, updates };
