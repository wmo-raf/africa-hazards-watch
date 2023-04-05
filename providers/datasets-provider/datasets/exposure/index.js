import people from "./people";
import infrastructure from "./infrastructure";
import foodSecurity from "./food-security";

const datasets = [
  ...foodSecurity.datasets,
  ...people.datasets,
  ...infrastructure.datasets,
];

export default { datasets };
