import synopCharts from "./synop-charts";
import synopHumidity from "./synop-humidity";
import synopCloudType from "./synop-cloud-type";
import synopCloudBaseHeight from "./synop-cloud-base-height";
import synopLiquidPrecipitation from "./synop-liquid-precipitation";

const datasets = [
  ...synopCharts.datasets,
  ...synopHumidity.datasets,
  ...synopLiquidPrecipitation.datasets,
  ...synopCloudType.datasets,
  ...synopCloudBaseHeight.datasets,
];

const updates = [
  ...synopCharts.updates,
  ...synopHumidity.updates,
  ...synopLiquidPrecipitation.updates,
  ...synopCloudType.updates,
  ...synopCloudBaseHeight.updates,
];

export default { datasets, updates };
