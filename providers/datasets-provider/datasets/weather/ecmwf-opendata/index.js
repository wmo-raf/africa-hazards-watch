import ecmwfTemperature from "./ecmwf-temperature";
import ecmwfPrecipitation from "./ecmwf-precipitation";
import ecmwfMeanSeaLevelPressure from "./ecmwf-mean-sea-level-pressure";
import ecmwfGeopotentialHeight from "./ecmwf-geopotential-height";
import ecmwfRelativeHumidity from "./ecmwf-relative-humidity";
import ecmwfSpecificHumidity from "./ecmwf-specific-humidity";
import ecmwfWindDivergence from "./ecmwf-wind-divergence";
import ecmwfWindVorticity from "./ecmwf-wind-vorticity";
import ecmwfWindspeed from "./ecmwf-windspeed";

export default [
  ...ecmwfPrecipitation,
  ...ecmwfTemperature,
  ...ecmwfWindspeed,
  ...ecmwfWindDivergence,
  ...ecmwfWindVorticity,
  ...ecmwfRelativeHumidity,
  ...ecmwfSpecificHumidity,
  ...ecmwfMeanSeaLevelPressure,
  ...ecmwfGeopotentialHeight,
];
