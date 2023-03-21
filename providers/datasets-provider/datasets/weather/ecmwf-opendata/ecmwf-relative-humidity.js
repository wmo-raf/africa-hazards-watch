import { ECMWF_RELATIVE_HUMIDITY_FORECAST } from "data/layers";

const datasetName = "Relative Humidity";
const layerName = ECMWF_RELATIVE_HUMIDITY_FORECAST;
const metadataId = "";
const timestampsDataPath =
  "/gskydata/ecmwf-forecast/oper_fc_relative_humidity_pl_1000";
const owsNameSpace = "ecmwf-opendata";

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
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://20.56.94.119/gsky/ows/${owsNameSpace}?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers={pLevel}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "choropleth",
          items: [
            {
              name: "65",
              color: "",
            },
            {
              name: "80",
              color: "#28ff00",
            },
            {
              name: "95",
              color: "#03ffec",
            },
            {
              name: "100%",
              color: "#0000ff",
            },
          ],
        },
        params: {
          time: "",
          geojson_feature_id: "",
          pLevel: "oper_fc_relative_humidity_pl_1000",
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
              { label: "1000 hPa", value: "oper_fc_relative_humidity_pl_1000" },
              { label: "925 hPa", value: "oper_fc_relative_humidity_pl_925" },
              { label: "850 hPA", value: "oper_fc_relative_humidity_pl_850" },
              { label: "700 hPA", value: "oper_fc_relative_humidity_pl_700" },
              { label: "500 hPA", value: "oper_fc_relative_humidity_pl_500" },
              { label: "300 hPA", value: "oper_fc_relative_humidity_pl_300" },
              { label: "250 hPA", value: "oper_fc_relative_humidity_pl_250" },
              { label: "200 hPA", value: "oper_fc_relative_humidity_pl_200" },
              { label: "50 hPA", value: "oper_fc_relative_humidity_pl_50" },
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
