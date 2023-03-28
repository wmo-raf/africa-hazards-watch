import people from "./people";
import infrastructure from "./infrastructure";

const datasets = [...people.datasets, ...infrastructure.datasets];

export default { datasets };
