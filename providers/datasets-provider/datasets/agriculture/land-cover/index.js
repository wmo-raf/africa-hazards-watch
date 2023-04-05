import cropArea from "./crop-area";
import rangelandArea from "./rangeland-area";

const datasets = [...cropArea.datasets, ...rangelandArea.datasets];

const updates = [...cropArea.updates, ...rangelandArea.updates];

export default { datasets, updates };
