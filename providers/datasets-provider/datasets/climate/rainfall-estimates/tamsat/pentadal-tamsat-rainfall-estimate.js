import { fetchTimestamps } from "services/timestamps";

const datasetName = "Pentadal Rainfall Estimates";
const layerName = "tamsat_pentadal_rainfall_estimate_rfe";
const metadataId = "d991c858-15f5-4c51-8d1c-452a2147e8e4";
const dataPath =
  "/gskydata/tamsat-rainfall/tamsat_pentadal_rainfall_estimate_rfe";
const owsNameSpace = "rainfall-estimates";

const category = "climate";
const subCategory = "rainfall_estimates";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "TAMSAT, From 1983 to recent",
    group: "tamsat",
    global: true,
    capabilities: ["clip", "timeseries"],
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
              `http://20.56.94.119/gsky/ows/${owsNameSpace}/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&geojson_feature_id={geojson_feature_id}`,
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
              name: 1.0,
              color: "#ffffff",
            },
            {
              name: "",
              color: "#cfb8b6",
            },
            {
              name: 10.0,
              color: "#c3ffc3",
            },
            {
              name: "",
              color: "#03ff81",
            },
            {
              name: 20.0,
              color: "#c1efff",
            },
            {
              name: "",
              color: "#7fc2ee",
            },
            {
              name: 40.0,
              color: "#1891ff",
            },
            {
              name: "",
              color: "#1075ce",
            },
            {
              name: 75.0,
              color: "#fff790",
            },
            {
              name: "",
              color: "#efae04",
            },
            {
              name: 150.0,
              color: "#ef3d01",
            },
            {
              name: "",
              color: "#8c0000",
            },
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
            dateFormat: { currentTime: "mmm yyyy", asPeriod: "pentadal" },
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
        analysisConfig: [],
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
