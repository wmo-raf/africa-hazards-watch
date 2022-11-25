import precipitationForecast from "./gfs-precipitation-1hr";
import temperatureForecast from "./gfs-temperature";
import liveImagery from "./live-imagery";
import gfsWindSpeed from "./gfs-wind-speed";
import gfsRelativeHumidity from "./gfs-relative-humidity";
import gfsMeanSeaLevelPressure from "./gfs-mean-sea-level-pressure";
// import gfsPrecipitableWaterTotal from "./gfs-precipitable-water-total";
// import gfsCloudWaterTotal from "./gfs-cloud-water-total";
// import gfsSunshine from "./gfs-sunshine";

import longRangeForecast from "./long-range-forecast";
import synopTemperature from "./observations/synop-air-temperature";
import synopHumidity from "./observations/synop-humidity";
import synopDewTemperature from "./observations/synop-dew-temperature";
import synopWind from "./observations/synop-wind";
import synopSkyCover from "./observations/synop-sky-cover";
import synopCloudType from "./observations/synop-cloud-type";
import synopCloudBaseHeight from "./observations/synop-cloud-base-height";
import synopLiquidPrecipitation from "./observations/synop-liquid-precipitation";

export default [
  ...precipitationForecast,
  ...temperatureForecast,
  ...gfsWindSpeed,
  ...gfsRelativeHumidity,
  ...gfsMeanSeaLevelPressure,
  ...liveImagery,
  ...longRangeForecast,
  ...synopTemperature,
  ...synopDewTemperature,
  ...synopHumidity,
  ...synopWind,
  ...synopLiquidPrecipitation,
  ...synopSkyCover,
  ...synopCloudType,
  ...synopCloudBaseHeight,
  // ...gfsPrecipitableWaterTotal,
  // ...gfsCloudWaterTotal,
  // ...gfsSunshine,
];
