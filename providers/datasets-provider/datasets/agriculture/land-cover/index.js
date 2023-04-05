import cropArea from "./crop-area";
import rangelandArea from "./rangeland-area";

const datasets = [...cropArea.datasets, ...rangelandArea.datasets];

const updates = [];

export default { datasets, updates };
