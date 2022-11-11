import { fetchGskyWps } from "services/gsky-wps";
import { parseISO, addDays } from "date-fns";

import {
  POLITICAL_BOUNDARIES_DATASET,
  GFS_TEMPERATURE_FORECAST_DATASET,
} from "data/datasets";
import { POLITICAL_BOUNDARIES, GFS_TEMPERATURE_FORECAST } from "data/layers";

import getWidgetProps from "./selectors";

export default {
  widget: "gfs_temperature_2m_widget",
  title: "Temperature Forecast for {location}",
  categories: ["summary"],
  large: true,
  types: ["country", "geostore", "point"],
  admins: ["adm0", "adm1", "adm2"],
  metaKey: "",
  sortOrder: {},
  visible: ["analysis", "dashboard"],
  chartType: "composedChart",
  colors: "weather",
  sentences: {},
  datasets: [
    {
      dataset: POLITICAL_BOUNDARIES_DATASET,
      layers: [POLITICAL_BOUNDARIES],
      boundary: true,
    },
    // forecast
    {
      dataset: GFS_TEMPERATURE_FORECAST_DATASET,
      layers: [GFS_TEMPERATURE_FORECAST],
      keys: ["temperature_forecast"],
    },
  ],
  refetchKeys: ["time"],
  requiresTime: true,
  settings: {
    time: "",
  },
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

    const wpsIdentifier = "gfs_temperature_2m_GeometryDrill";

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
        owsNameSpace: "gfs",
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
        owsNameSpace: "gfs",
        token: token,
      }).then((res) => res.data);
    }
  },
  getWidgetProps,
};
