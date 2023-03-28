import tamsatRainfallEstimate from "./monthly-tamsat-rainfall-estimate";
import tamsatRainfallAnomaly from "./monthly-tamsat-rainfall-anomaly";

const datasets = [
  ...tamsatRainfallEstimate.datasets,
  ...tamsatRainfallAnomaly.datasets,
];

const updates = [
  ...tamsatRainfallEstimate.updates,
  ...tamsatRainfallAnomaly.updates,
];

export default { datasets, updates };
