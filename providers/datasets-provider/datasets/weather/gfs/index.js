import precipitationForecast from "./gfs-precipitation-1hr";
import temperatureForecast from "./gfs-temperature";
import gfsWindSpeed from "./gfs-wind-speed";
import gfsRelativeHumidity from "./gfs-relative-humidity";
import gfsMeanSeaLevelPressure from "./gfs-mean-sea-level-pressure";

export default [
  ...precipitationForecast,
  ...temperatureForecast,
  ...gfsWindSpeed,
  ...gfsRelativeHumidity,
  ...gfsMeanSeaLevelPressure,
];
