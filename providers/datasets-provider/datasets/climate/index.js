import era5Temperature from "./era5-monthly-temperature-2-m";
import era5Precipitation from "./era5-monthly-precipitation-1-day";

export default [...era5Precipitation, ...era5Temperature];
