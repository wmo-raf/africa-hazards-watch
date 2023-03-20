import { ECMWF_GEOPOTENTIAL_HEIGHT_FORECAST } from "data/layers";

const datasetName = "Geopotential Height";
const layerName = ECMWF_GEOPOTENTIAL_HEIGHT_FORECAST;
const metadataId = "";
const timestampsDataPath =
  "/gskydata/ecmwf-forecast/oper_fc_geopotential_height_pl_1000";

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
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        citation: "",
        default: true,
        dataset: layerName,
        layerConfig: {
          type: "vector",
          source: {
            type: "vector",
            tiles: [
              `http://20.56.94.119/pg4w/tileserv/pgadapter.{pLevel}/{z}/{x}/{y}.pbf?data_date={time}`,
            ],
          },
          render: {
            layers: [
              {
                "source-layer": "default",
                type: "line",
                paint: {
                  "line-color": "#000",
                  "line-width": 1.5,
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
          pLevel: "oper_fc_geopotential_height_pl_1000",
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
          {
            key: "pLevel",
            required: true,
            type: "radio",
            options: [
              {
                label: "1000 hPa",
                value: "oper_fc_geopotential_height_pl_1000",
              },
              { label: "925 hPa", value: "oper_fc_geopotential_height_pl_925" },
              { label: "850 hPA", value: "oper_fc_geopotential_height_pl_850" },
              { label: "700 hPA", value: "oper_fc_geopotential_height_pl_700" },
              { label: "500 hPA", value: "oper_fc_geopotential_height_pl_500" },
              { label: "300 hPA", value: "oper_fc_geopotential_height_pl_300" },
              { label: "250 hPA", value: "oper_fc_geopotential_height_pl_250" },
              { label: "200 hPA", value: "oper_fc_geopotential_height_pl_200" },
              { label: "50 hPA", value: "oper_fc_geopotential_height_pl_50" },
            ],
            sentence: "Pressure Level {selector}",
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
