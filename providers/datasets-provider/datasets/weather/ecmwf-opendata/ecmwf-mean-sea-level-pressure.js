import { ECMWF_MSLP_FORECAST } from "data/layers";

const datasetName = "Mean Sea Level Pressure";
const layerName = ECMWF_MSLP_FORECAST;
const metadataId = "";
const timestampsDataPath =
  "/gskydata/ecmwf-forecast/oper_fc_mean_sea_level_pressure_sfc";
const owsNameSpace = "ecmwf-opendata";

const layerId = "oper_fc_mean_sea_level_pressure_sfc";

const category = 1;
const subCategory = 1;

export default [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "ECMWF IFS, 3-Hourly for the next 6 days, 0.4° grid spacing",
    model: "ecmwf",
    isMultiLayer: true,
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
                  "line-color": "#000",
                  "line-width": [
                    "case",
                    ["==", ["to-number", ["get", "el_val"]], 990],
                    2,
                    ["==", ["to-number", ["get", "el_val"]], 1010],
                    2,
                    ["==", ["to-number", ["get", "el_val"]], 1030],
                    2,
                    0.5,
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
