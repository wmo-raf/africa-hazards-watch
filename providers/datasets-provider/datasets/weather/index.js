import precipitationForecast from "./gfs-precipitation-1hr";
import temperatureForecast from "./gfs-temperature";
import liveImagery from "./live-imagery";
import gfsWindSpeed from "./gfs-wind-speed";
import gfsRelativeHumidity from "./gfs-relative-humidity";
import gfsMeanSeaLevelPressure from "./gfs-mean-sea-level-pressure";
import gfsPrecipitableWaterTotal from "./gfs-precipitable-water-total";
import gfsCloudWaterTotal from "./gfs-cloud-water-total";
import gfsSunshine from "./gfs-sunshine";

import longRangeForecast from "./long-range-forecast";

export default [
  ...precipitationForecast,
  ...temperatureForecast,
  ...gfsWindSpeed,
  ...gfsRelativeHumidity,
  ...gfsMeanSeaLevelPressure,
  ...gfsPrecipitableWaterTotal,
  ...gfsCloudWaterTotal,
  ...gfsSunshine,
  ...liveImagery,
  ...longRangeForecast,
];
