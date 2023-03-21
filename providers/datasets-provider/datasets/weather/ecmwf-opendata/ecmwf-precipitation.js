import { ECMWF_PRECIPITATION_FORECAST } from "data/layers";

const datasetName = "Precipitation Forecast ";
const layerName = ECMWF_PRECIPITATION_FORECAST;
const metadataId = "";
const timestampsDataPath =
  "/gskydata/ecmwf-forecast/oper_fc_total_precipitation_sfc";

const layerId = "oper_fc_total_precipitation_sfc";
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
              `http://20.56.94.119/gsky/ows/${owsNameSpace}?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerId}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          items: [
            { name: "", color: "#4f57b7" },
            { name: 0.2, color: "#554eb1" },
            { name: "", color: "#4369c4" },
            { name: 1, color: "#40a0b4" },
            { name: "", color: "#4ec262" },
            { name: 4, color: "#95db46" },
            { name: "", color: "#dcea37" },
            { name: 8, color: "#ebc038" },
            { name: "", color: "#eaa43e" },
            { name: 15, color: "#e97b48" },
            { name: "", color: "#e1545d" },
            { name: 30, color: "#be3066" },
            { name: "40 mm", color: "#93174e" },
          ],
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
    ],
  },
];
