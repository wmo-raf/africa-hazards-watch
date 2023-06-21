import synopHumidity from "./synop-humidity";
import synopCloudType from "./synop-cloud-type";
import synopLiquidPrecipitation from "./synop-liquid-precipitation";
import synopCloudBaseHeight from "./synop-cloud-base-height";
import synopCharts from "./synop-charts";

const datasets = [
  ...synopCharts.datasets,
  ...synopHumidity.datasets,
  ...synopLiquidPrecipitation.datasets,
  ...synopCloudType.datasets,
  ...synopCloudBaseHeight.datasets,
];

const updates = [
  ...synopHumidity.updates,
  ...synopCloudType.updates,
  ...synopLiquidPrecipitation.updates,
  ...synopCloudBaseHeight.updates,
  ...synopCharts.updates,
];

export default { datasets, updates };
