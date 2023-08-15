// import ecmwfTemperature from "./ecmwf-temperature";
import ecmwfPrecipitation from "./ecmwf-precipitation";

const datasets = [...ecmwfPrecipitation.datasets];

const updates = [...ecmwfPrecipitation.updates];

export default { datasets, updates };
