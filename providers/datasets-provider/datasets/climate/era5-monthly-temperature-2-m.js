import { fetchTimestamps } from "services/timestamps";

const datasetName = "Monthly Surface Temperature Average";
const layerName = "era5monthly_temperature_2_m";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";
const dataPath = "/gskydata/era5/era5monthly-temperature-2-m";

const category = 2;
const subCategory = 1;

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
              `http://20.56.94.119/gsky/ows/era5?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          items: [
            { name: -20, color: "#9589D3" },
            { name: "", color: "#96d1d8" },
            { name: "-10", color: "#81ccc5" },
            { name: "", color: "#67b4ba" },
            { name: "0", color: "#5f8fc5" },
            { name: "", color: "#508c3e" },
            { name: "10", color: "#79921c" },
            { name: "", color: "#aba10e" },
            { name: "20", color: "#dfb106" },
            { name: "", color: "#f39606" },
            { name: "30", color: "#ec5f15" },
            { name: "", color: "#be4112" },
            { name: "40 °C", color: "#8A2B0A" },
          ],
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
            key: "era5_mean",
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
