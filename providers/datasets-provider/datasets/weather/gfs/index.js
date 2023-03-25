import precipitationForecast from "./gfs-precipitation-1hr";
import temperatureForecast from "./gfs-temperature";
import gfsWindSpeed from "./gfs-wind-speed";
import gfsRelativeHumidity from "./gfs-relative-humidity";
import gfsMeanSeaLevelPressure from "./gfs-mean-sea-level-pressure";

const datasets = [
  ...precipitationForecast.datasets,
  ...temperatureForecast.datasets,
  ...gfsWindSpeed.datasets,
  ...gfsRelativeHumidity.datasets,
  ...gfsMeanSeaLevelPressure.datasets,
];

const updates = [
  ...precipitationForecast.updates,
  ...temperatureForecast.updates,
  ...gfsWindSpeed.updates,
  ...gfsRelativeHumidity.updates,
  ...gfsMeanSeaLevelPressure.updates,
];

export default { datasets, updates };
