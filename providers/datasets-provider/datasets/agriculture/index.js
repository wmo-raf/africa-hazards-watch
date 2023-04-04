import foodSecurity from "./food-security";
import vegetationIndices from "./vegetation-indices";

const datasets = [...foodSecurity.datasets, ...vegetationIndices.datasets];

const updates = [...vegetationIndices.updates];

export default { datasets, updates };