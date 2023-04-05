import landcover from "./landcover";
import dustForecast from "./dust-forecast";
import vegetationIndices from "./vegetation-indices";

const datasets = [
  ...dustForecast.datasets,
  ...vegetationIndices.datasets,
  ...landcover.datasets,
];

const updates = [...dustForecast.updates, ...vegetationIndices.updates];

export default { datasets, updates };
