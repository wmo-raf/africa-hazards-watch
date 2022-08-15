import population from "./population";
import dams from "./dams";
import power_plants from "./power_plants";
import health_facilities from "./health_facilities";
import airports from "./airports";

export default [
  ...population,
  ...airports,
  ...dams,
  ...power_plants,
  ...health_facilities,
];
