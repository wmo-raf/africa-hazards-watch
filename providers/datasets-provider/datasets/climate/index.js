import era5Temperature from "./era5-monthly-temperature-2-m";
import era5Precipitation from "./era5-monthly-precipitation-1-day";
import era5monthlyTemperature2MAnomaly from "./era5monthly-temperature-2-m-anomaly";
import era5monthlyPrecipitation1DayAnomaly from "./era5monthly-precipitation-1-day-anomaly";

export default [
  ...era5Temperature,
  ...era5Precipitation,
  ...era5monthlyTemperature2MAnomaly,
  ...era5monthlyPrecipitation1DayAnomaly,
];
