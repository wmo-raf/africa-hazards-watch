import population from "./population";
import dams from "./dams";
import power_plants from "./power_plants";
import health_facilities from "./health_facilities";
import airports from "./airports";

const datasets = [
  ...population.datasets,
  ...airports.datasets,
  ...dams.datasets,
  ...power_plants.datasets,
  ...health_facilities.datasets,
];

export default { datasets };
