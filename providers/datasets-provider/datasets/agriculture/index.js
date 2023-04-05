import foodSecurity from "./food-security";
import vegetationIndices from "./vegetation-indices";
import asapAgricWarnings from "./asap-agric-warnings";
import landCover from "./land-cover";

const datasets = [
  ...vegetationIndices.datasets,
  ...foodSecurity.datasets,
  ...asapAgricWarnings.datasets,
  ...landCover.datasets
];

const updates = [...vegetationIndices.updates, ...asapAgricWarnings.updates];

export default { datasets, updates };
