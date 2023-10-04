import wrfEac from "./wrf-eac";
import wrfLakeVictoria from "./wrf-lake-victoria";

const datasets = [...wrfLakeVictoria.datasets, ...wrfEac.datasets];
const updates = [...wrfLakeVictoria.updates, ...wrfEac.updates];

export default { datasets, updates };
