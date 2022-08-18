import era5Temperature from "./era5-monthly-temperature-2-m";
import era5Precipitation from "./era5-monthly-precipitation-1-day";
import surfaceTempValueProjection from "./surface-temp-value-projection";
import soilMoisture from "./soil-moisture";
import floods from "./floods";

export default [
  ...era5Precipitation,
  ...era5Temperature,
  ...surfaceTempValueProjection,
  ...soilMoisture,
  ...floods,
];
