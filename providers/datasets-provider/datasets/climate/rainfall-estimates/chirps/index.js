import pentadalChirpsRainfallEstimate from "./pentadal-chirps-rainfall-estimate";
import pentadalChirpsRainfallAnomaly from "./pentadal-chirps-rainfall-anomaly";
import monthlyChirpsRainfallEstimate from "./monthly-chirps-rainfall-estimate";
import monthlyChirpsRainfallAnomaly from "./monthly-chirps-rainfall-anomaly";

const datasets = [
  ...pentadalChirpsRainfallEstimate.datasets,
  ...pentadalChirpsRainfallAnomaly.datasets,
  ...monthlyChirpsRainfallEstimate.datasets,
  ...monthlyChirpsRainfallAnomaly.datasets,
];

const updates = [
  ...pentadalChirpsRainfallEstimate.updates,
  ...pentadalChirpsRainfallAnomaly.updates,
  ...monthlyChirpsRainfallEstimate.updates,
  ...monthlyChirpsRainfallAnomaly.updates,
];

export default { datasets, updates };
