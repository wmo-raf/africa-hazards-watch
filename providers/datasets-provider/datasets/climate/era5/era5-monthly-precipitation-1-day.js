import { fetchTimestamps } from "services/timestamps";

const datasetName = "Monthly Total Precipitation Average";
const layerName = "era5monthly_precipitation_1_day";
const metadataId = "0cf9e8d5-42eb-426c-811b-e89661eb2ff3";
const dataPath = "/gskydata/era5/era5monthly-precipitation-1-day";

const category = "climate";
const subCategory = "monthly-averages";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "ERA5 reanalysis, From 1959 to recent",
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        default: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://20.56.94.119/gsky/ows/era5?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          items: [
            { name: 0, color: "#52478d" },
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
            { name: "", color: "#e15e5d" },
            { name: 30, color: "#be3066" },
            { name: "", color: "#93174e" },
            { name: "50 mm", color: "#541029" },
          ],
        },
        params: {
          time: "",
          geojson_feature_id: "",
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "mmmm, yyyy" },
            availableDates: [],
          },
        ],
        timeParamSentenceConfig: {
          param: "time",
          format: "mmm, yyyy",
          add: 7,
          template: "Selected Period : {time}",
        },
        hidePastTimestamps: true, // we might need to hide past forecast
        data_path: dataPath,
        analysisConfig: [
          {
            key: "era5_yearly_precipitation",
            type: "admin",
          },
        ],
      },
    ],
  },
];

const updates = [
  {
    layer: layerName,
    getTimestamps: (params = {}, token) => {
      return fetchTimestamps(dataPath).then((res) => {
        const timestamps = (res.data && res.data.timestamps) || [];

        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      return timestamps[timestamps.length - 1];
    },
  },
];

export default { datasets, updates };
