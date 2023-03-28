import { fetchTimestamps } from "services/timestamps";

const datasetName = "Monthly Rainfall Estimates";
const layerName = "monthly_chirps_rainfall_estimate";
const metadataId = "";
const dataPath = "/gskydata/chirps-rainfall/monthly_chirps_rainfall_estimate";
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
    citation: "CHIRPS, From 1981 to recent",
    group: "chirps",
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
              name: 5,
              color: "#ffffff",
            },
            {
              name: "10",
              color: "#cfb8b6",
            },
            {
              name: 20,
              color: "#c3ffc3",
            },
            {
              name: "30",
              color: "#03ff81",
            },
            {
              name: 100,
              color: "#c1efff",
            },
            {
              name: "250",
              color: "#7fc2ee",
            },
            {
              name: 200,
              color: "#1891ff",
            },
            {
              name: 300,
              color: "#1075ce",
            },
            {
              name: "400",
              color: "#fff790",
            },
            {
              name: 600,
              color: "#efae04",
            },
            {
              name: 800,
              color: "#ef3d01",
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
