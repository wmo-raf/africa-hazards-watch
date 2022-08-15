import precipitationForecast from "./gfs-precipitation-1hr";
import temperatureForecast from "./gfs-temperature-2m";

export default [...precipitationForecast, ...temperatureForecast];
