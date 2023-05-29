import rgb_naturalenhncd from "./rgb_naturalenhncd";
import precipatation_rate from "./precipatation_rate";
import worldcloudmap_ir108 from "./worldcloudmap_ir108";
import high_rate_seviri_ir108 from "./high_rate_seviri_ir10.8";

const datasets = [
  ...rgb_naturalenhncd.datasets,
  ...precipatation_rate.datasets,
  // ...worldcloudmap_ir108.datasets,
  ...high_rate_seviri_ir108.datasets,
];
const updates = [
  ...rgb_naturalenhncd.updates,
  ...precipatation_rate.updates,
  // ...worldcloudmap_ir108.updates,
  ...high_rate_seviri_ir108.updates,
];

export default { datasets, updates };
