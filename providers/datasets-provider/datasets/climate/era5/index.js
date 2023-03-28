import era5Temperature from "./era5-monthly-temperature-2-m";
import era5Precipitation from "./era5-monthly-precipitation-1-day";
import era5monthlyTemperature2MAnomaly from "./era5monthly-temperature-2-m-anomaly";
import era5monthlyPrecipitation1DayAnomaly from "./era5monthly-precipitation-1-day-anomaly";

const datasets = [
  ...era5Temperature.datasets,
  ...era5Precipitation.datasets,
  ...era5monthlyTemperature2MAnomaly.datasets,
  ...era5monthlyPrecipitation1DayAnomaly.datasets,
];

const updates = [
  ...era5Temperature.updates,
  ...era5Precipitation.updates,
  ...era5monthlyTemperature2MAnomaly.updates,
  ...era5monthlyPrecipitation1DayAnomaly.updates,
];

export default { datasets, updates };
