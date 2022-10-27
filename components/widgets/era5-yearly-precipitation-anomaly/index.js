import { fetchGskyWps } from "services/gsky-wps";

import {
  POLITICAL_BOUNDARIES_DATASET,
  ERA5_MONTHLY_TOTAL_PRECIPITATION_ANOMALY_DATASET,
} from "data/datasets";
import {
  POLITICAL_BOUNDARIES,
  ERA5_MONTHLY_TOTAL_PRECIPITATION_ANOMALY,
} from "data/layers";

import getWidgetProps from "./selectors";

export default {
  widget: "era5monthly_yearly_precipitation_anomaly_widget",
  title: "Yearly Precipitation Anomaly for {location}",
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
      dataset: ERA5_MONTHLY_TOTAL_PRECIPITATION_ANOMALY_DATASET,
      layers: [ERA5_MONTHLY_TOTAL_PRECIPITATION_ANOMALY],
      keys: ["era5_precipitation_anomaly"],
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

    const wpsIdentifier = "era5monthly_precipitation_1_day_anomaly";

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
      return fetchGskyWps({
        identifier: wpsIdentifier,
        feature: featurePayload,
        startDateTimeParam: startDateTimeParam,
        endDateTimeParam: endDateTimeParam,
        owsNameSpace: "era5",
        token: token,
      }).then((res) => res.data);
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

      return fetchGskyWps({
        identifier: wpsIdentifier,
        feature: featurePayload,
        startDateTimeParam: startDateTimeParam,
        endDateTimeParam: endDateTimeParam,
        owsNameSpace: "era5",
        token: token,
      }).then((res) => res.data);
    }
  },
  getWidgetProps,
  detailReport: {
    point: {
      visible: ["analysis"],
      linkTemplate: "/topics/climate-change/point/{adm0}/{adm1}",
      locationParams: ["adm0", "adm1"],
    },
  },
};
