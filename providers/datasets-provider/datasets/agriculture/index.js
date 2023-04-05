import asapAgricWarnings from "./asap-agric-warnings";
import landCover from "./land-cover";

const datasets = [...asapAgricWarnings.datasets, ...landCover.datasets];

const updates = [...asapAgricWarnings.updates, ...landCover.updates];

export default { datasets, updates };
