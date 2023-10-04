import precipitationForecast from "./precipitation";
import precipitationAccumulated from "./precipitation-accumulated";
import relativeHumidity from "./relative-humidity";
import temperature from "./temperature";

const datasets = [
  ...precipitationForecast.datasets,
  ...precipitationAccumulated.datasets,
  ...relativeHumidity.datasets,
  ...temperature.datasets,
];

const updates = [
  ...precipitationForecast.updates,
  ...precipitationAccumulated.updates,
  ...relativeHumidity.updates,
  ...temperature.updates,
];

export default { datasets, updates };
