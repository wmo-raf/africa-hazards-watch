import { fetchGskyWps } from "services/gsky-wps";

import {
  POLITICAL_BOUNDARIES_DATASET,
  ERA5_MONTHLY_SURFACE_TEMPERATURE_MEAN_DATASET,
} from "data/datasets";
import {
  POLITICAL_BOUNDARIES,
  ERA5_MONTHLY_SURFACE_TEMPERATURE_MEAN,
} from "data/layers";

import getWidgetProps from "./selectors";

export default {
  widget: "era5monthly_temperature_2_m_widget",
  title: "Yearly Temperature Change for {location}",
  categories: ["summary"],
  types: ["country", "geostore", "point"],
  admins: ["adm0", "adm1", "adm2"],
  large: true,
  metaKey: "",
  sortOrder: {},
  visible: ["analysis", "dashboard"],
  chartType: "composedChart",
  colors: "weather",
  sentences: {},
  settings: {
    time: "",
  },
  datasets: [
    {
      dataset: POLITICAL_BOUNDARIES_DATASET,
      layers: [POLITICAL_BOUNDARIES],
      boundary: true,
    },
    {
      dataset: ERA5_MONTHLY_SURFACE_TEMPERATURE_MEAN_DATASET,
      layers: [ERA5_MONTHLY_SURFACE_TEMPERATURE_MEAN],
      keys: ["era5_mean"],
    },
  ],
  getData: (params = {}, token) => {
    const {
      endpoint,
      geostore: { info, geojson, id },
      isPoint,
      adm0,
      adm1,
      type,
      adm2,
      isAnalysis,
    } = params;

    const startDateTimeParam = "1959-01-01T00:00";

    // get up to last year dec
    const endDateTime = Number(new Date().getFullYear() - 1);
    const endDateTimeParam = `${endDateTime}-12-31T00:00`;

    const wpsIdentifier = "era5monthly_temperature_2_m";

    // if point, make a FeatureCollection and run analysis
    if (isPoint) {
      const featurePayload = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [Number(adm1), Number(adm0)],
            },
          },
        ],
      };
      return fetchGskyWps(
        wpsIdentifier,
        featurePayload,
        startDateTimeParam,
        endDateTimeParam,
        token
      );
    } else {
      const feature = geojson && geojson.features ? geojson.features[0] : {};

      const featurePayload = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: feature.geometry.type,
              coordinates: feature.geometry.coordinates,
            },
          },
        ],
      };

      return fetchGskyWps(
        wpsIdentifier,
        featurePayload,
        startDateTimeParam,
        endDateTimeParam,
        token
      );
    }
  },
  getWidgetProps,
};
