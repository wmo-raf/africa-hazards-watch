import ecmwfTemperature from "./ecmwf-temperature";
import ecmwfPrecipitation from "./ecmwf-precipitation";
import ecmwfWind from "./ecmwf-wind";
import ecmwfCloudCover from "./ecmwf-cloud-cover";
import ecmwfMsl from "./ecmwf-msl";
import ecmwfGeopotentialHeight from "./ecmwf-geopotential-height";
import ecmwfRelativeHumidity from "./ecmwf-rh";

const datasets = [
  ...ecmwfPrecipitation.datasets,
  ...ecmwfTemperature.datasets,
  ...ecmwfWind.datasets,
  ...ecmwfRelativeHumidity.datasets,
  ...ecmwfMsl.datasets,
  ...ecmwfGeopotentialHeight.datasets,
  ...ecmwfCloudCover.datasets,
];

const updates = [
  ...ecmwfPrecipitation.updates,
  ...ecmwfTemperature.updates,
  ...ecmwfWind.updates,
  ...ecmwfRelativeHumidity.updates,
  ...ecmwfMsl.updates,
  ...ecmwfGeopotentialHeight.updates,
  ...ecmwfCloudCover.updates,
];

export default { datasets, updates };
