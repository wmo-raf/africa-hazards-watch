import landcover from "./landcover";
import dustForecast from "./dust-forecast";

const datasets = [...dustForecast.datasets, ...landcover.datasets];

const updates = [...dustForecast.updates];

export default { datasets, updates };
