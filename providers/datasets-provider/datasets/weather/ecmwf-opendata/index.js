import ecmwfTemperature from "./ecmwf-temperature";
import ecmwfPrecipitation from "./ecmwf-precipitation";
import ecmwfMeanSeaLevelPressure from "./ecmwf-mean-sea-level-pressure";
import ecmwfGeopotentialHeight from "./ecmwf-geopotential-height";
import ecmwfRelativeHumidity from "./ecmwf-relative-humidity";
import ecmwfSpecificHumidity from "./ecmwf-specific-humidity";
import ecmwfWindDivergence from "./ecmwf-wind-divergence";
import ecmwfWindVorticity from "./ecmwf-wind-vorticity";
import ecmwfWindspeed from "./ecmwf-windspeed";

const datasets = [
  ...ecmwfPrecipitation.datasets,
  ...ecmwfTemperature.datasets,
  ...ecmwfWindspeed.datasets,
  ...ecmwfWindDivergence.datasets,
  ...ecmwfWindVorticity.datasets,
  ...ecmwfRelativeHumidity.datasets,
  ...ecmwfSpecificHumidity.datasets,
  ...ecmwfMeanSeaLevelPressure.datasets,
  ...ecmwfGeopotentialHeight.datasets,
];

const updates = [
  ...ecmwfPrecipitation.updates,
  ...ecmwfTemperature.updates,
  ...ecmwfWindspeed.updates,
  ...ecmwfWindDivergence.updates,
  ...ecmwfWindVorticity.updates,
  ...ecmwfRelativeHumidity.updates,
  ...ecmwfSpecificHumidity.updates,
  ...ecmwfMeanSeaLevelPressure.updates,
  ...ecmwfGeopotentialHeight.updates,
];

export default { datasets, updates };
