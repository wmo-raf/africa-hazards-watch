import chirps from "./chirps";
import tamsat from "./tamsat";

const datasets = [...chirps.datasets, ...tamsat.datasets];

const updates = [...tamsat.updates, ...chirps.updates];

export default { datasets, updates };
