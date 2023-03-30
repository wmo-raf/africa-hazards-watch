import pentadalTamsatRainfallAnomaly from "./pentadal-tamsat-rainfall-anomaly";
import pentadalTamsatRainfallEstimate from "./pentadal-tamsat-rainfall-estimate";
import monthlyTamsatRainfallEstimate from "./monthly-tamsat-rainfall-estimate";
import monthlyTamsatRainfallAnomaly from "./monthly-tamsat-rainfall-anomaly";

const datasets = [
  ...pentadalTamsatRainfallEstimate.datasets,
  ...pentadalTamsatRainfallAnomaly.datasets,
  ...monthlyTamsatRainfallEstimate.datasets,
  ...monthlyTamsatRainfallAnomaly.datasets,
];

const updates = [
  ...pentadalTamsatRainfallEstimate.updates,
  ...pentadalTamsatRainfallAnomaly.updates,
  ...monthlyTamsatRainfallEstimate.updates,
  ...monthlyTamsatRainfallAnomaly.updates,
];

export default { datasets, updates };
