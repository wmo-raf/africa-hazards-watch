import synopCharts from "./synop-charts";
// import synopTemperature from "./observations/synop-air-temperature";
import synopHumidity from "./synop-humidity";
// import synopDewTemperature from "./observations/synop-dew-temperature";
// import synopWind from "./observations/synop-wind";
// import synopSkyCover from "./observations/synop-sky-cover";
import synopCloudType from "./synop-cloud-type";
import synopCloudBaseHeight from "./synop-cloud-base-height";
import synopLiquidPrecipitation from "./synop-liquid-precipitation";
// import synopAtmosPressure from "./observations/synop-atmos-pressure";

export default [
  ...synopCharts,
  // ...synopTemperature,
  // ...synopDewTemperature,
  // ...synopWind,
  // ...synopAtmosPressure,
  // ...synopSkyCover,
  ...synopHumidity,
  ...synopLiquidPrecipitation,
  ...synopCloudType,
  ...synopCloudBaseHeight,
];
