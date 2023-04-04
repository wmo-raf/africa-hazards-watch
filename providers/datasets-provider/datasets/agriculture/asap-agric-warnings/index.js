import cropWarnings from "./crop-warnings";
import rangelandWarnings from "./rangeland-warnings";

const datasets = [...cropWarnings.datasets, ...rangelandWarnings.datasets];

const updates = [...cropWarnings.updates, ...rangelandWarnings.updates];

export default { datasets, updates };
