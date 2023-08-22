import { ECMWF_MSLP_FORECAST } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Mean Sea Level Pressure";
const layerName = ECMWF_MSLP_FORECAST;
const metadataId = "51554f52-2f73-4333-be62-61c8ee3c59bb";
const timestampsDataPath =
  "/gskydata/ecmwf-forecast/oper_fc_mean_sea_level_pressure_sfc";
const owsNameSpace = "ecmwf-opendata";

const layerId = "oper_fc_mean_sea_level_pressure_sfc";

const category = "weather";
const subCategory = "weather-forecast";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "ECMWF IFS, 3-Hourly for the next 6 days, 0.4° grid spacing",
    group: "ecmwf",
    isMultiLayer: true,
    global: true,
    capabilities: ["clip", "timeseries"],
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        citation: "",
        default: true,
        dataset: layerName,
        isMultiLayer: true,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://20.56.94.119/gsky/ows/${owsNameSpace}?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerId}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          items: [],
        },
        params: {
          time: "",
          geojson_feature_id: "",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
          },
        ],
        timeParamSentenceConfig: {
          param: "time",
          format: "do MMM y hh:mm",
          add: 7,
          template: "Selected Period : {time}",
        },
        data_path: timestampsDataPath,
      },
      {
        name: "Contours",
        id: "ecmwf_mslp_contour",
        dataset: layerName,
        type: "layer",
        citation: "",
        default: false,
        isMultiLayer: true,
        nestedLegend: true,
        layerConfig: {
          type: "vector",
          source: {
            type: "vector",
            tiles: [
              `http://20.56.94.119/pg4w/tileserv/pgadapter.${layerId}/{z}/{x}/{y}.pbf?data_date={time}`,
            ],
          },
          render: {
            layers: [
              {
                "source-layer": "default",
                type: "line",
                paint: {
                  "line-color": "brown",
                  "line-width": [
                    "case",
                    ["==", ["to-number", ["get", "el_val"]], 990],
                    1,
                    ["==", ["to-number", ["get", "el_val"]], 1010],
                    1,
                    ["==", ["to-number", ["get", "el_val"]], 1030],
                    1,
                    0.4,
                  ],
                },
                metadata: {
                  position: "top",
                },
              },
              {
                "source-layer": "default",
                type: "symbol",
                layout: {
                  visibility: "visible",
                  "symbol-placement": "line",
                  "text-field": "{el_val}",
                  "text-font": ["Noto Sans Regular"],
                  "text-size": 15,
                  "text-allow-overlap": true,
                },
                paint: {
                  "text-color": "#0d4e9b",
                  "text-halo-width": 2,
                  "text-halo-color": "#fff",
                },
                metadata: {
                  position: "top",
                },
              },
            ],
          },
        },
        legendConfig: {
          type: "basic",
          items: [],
        },
        params: {
          time: "",
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
          },
        ],
        timeParamSentenceConfig: {
          param: "time",
          format: "do MMM y hh:mm",
          add: 7,
          template: "Selected Period : {time}",
        },
        data_path: timestampsDataPath,
      },
    ],
  },
];

const updates = [
  {
    layer: ECMWF_MSLP_FORECAST,
    getTimestamps: (params = {}, token) => {
      return fetchTimestamps(timestampsDataPath).then((res) => {
        const timestamps = (res.data && res.data.timestamps) || [];

        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      const nextDate = getNextDate(timestamps);

      if (nextDate) {
        return nextDate;
      }

      return timestamps[timestamps.length - 1];
    },
    updateInterval: 300000, // 5 minutes
  },
];

export default { datasets, updates };
