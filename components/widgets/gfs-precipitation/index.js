import { fetchGskyWps } from "services/gsky-wps";
import { parseISO, addDays } from "date-fns";

import {
  POLITICAL_BOUNDARIES_DATASET,
  GFS_PRECIPITATION_FORECAST_DATASET,
} from "data/datasets";
import { POLITICAL_BOUNDARIES, GFS_PRECIPITATION_FORECAST } from "data/layers";

import getWidgetProps from "./selectors";

export default {
  widget: "gfs_precipitation_1hr_widget",
  title: "Precipitation Forecast for {location}",
  categories: ["summary"],
  types: ["country", "geostore"],
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
    // forecast
    {
      dataset: GFS_PRECIPITATION_FORECAST_DATASET,
      layers: [GFS_PRECIPITATION_FORECAST],
      keys: ["forecast"],
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

    const { time } = params;

    const startDateTime = parseISO(time);

    const endDateTime = addDays(startDateTime, 5).toISOString();

    const startDateTimeParam = time.substring(0, 16);
    const endDateTimeParam = endDateTime.substring(0, 16);

    const wpsIdentifier = "gfs_precipitation_1hr_GeometryDrill";

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
      return fetchGskyWps(wpsIdentifier, featurePayload, token);
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
