import precipitationForecast from "./gfs-precipitation-1hr";
import temperatureForecast from "./gfs-temperature-2m";
import liveImagery from "./live-imagery";

import longRangeForecast from "./long-range-forecast";

export default [
  ...precipitationForecast,
  ...temperatureForecast,
  ...liveImagery,
  ...longRangeForecast,
];
