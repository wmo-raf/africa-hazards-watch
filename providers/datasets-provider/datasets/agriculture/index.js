import foodSecurity from "./food-security";
import vegetationIndices from "./vegetation-indices";

const datasets = [...vegetationIndices.datasets, ...foodSecurity.datasets];

const updates = [...vegetationIndices.updates];

export default { datasets, updates };
