import eviirsndvi_africa_pentad from "./eviirsndvi_africa_pentad";
import eviirsndvi_africa_pentad_anomaly from "./eviirsndvi_africa_pentad_anomaly";

const datasets = [
  ...eviirsndvi_africa_pentad.datasets,
  ...eviirsndvi_africa_pentad_anomaly.datasets,
];

const updates = [
  ...eviirsndvi_africa_pentad.updates,
  ...eviirsndvi_africa_pentad_anomaly.updates,
];

export default { datasets, updates };
