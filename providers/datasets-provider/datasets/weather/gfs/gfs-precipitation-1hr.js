import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";
import { GFS_PRECIPITATION_FORECAST } from "data/layers";

const datasetName = "Precipitation Forecast";
const layerName = GFS_PRECIPITATION_FORECAST;
const metadataId = "4ba0fb8c-3e9e-42ea-8956-f961dc80f71f";
const dataPath = "/gskydata/gfs/gfs-precipitation-1-hr";

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
    citation: "GFS, Hourly for the next 5 days",
    group: "gfs",
    global: true,
    // initialVisible: true,
    capabilities: ["clip", "timeseries", "analysis"],
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        // citation: periodStr,
        default: true,
        active: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://20.56.94.119/gsky/ows/gfs?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          title: "mm",
          items: [
            { name: "0", color: "#4f57b7" },
            { name: 0.2, color: "#554eb1" },
            { name: 0.5, color: "#4369c4" },
            { name: 1, color: "#40a0b4" },
            { name: 2, color: "#4ec262" },
            { name: 4, color: "#95db46" },
            { name: 6, color: "#dcea37" },
            { name: 8, color: "#ebc038" },
            { name: 10, color: "#eaa43e" },
            { name: 15, color: "#e97b48" },
            { name: 20, color: "#e1545d" },
            { name: 30, color: "#be3066" },
            { name: "40", color: "#93174e" },
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
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
          },
        ],
        hidePastTimestamps: true, // we might need to hide past forecast
        data_path: dataPath,
        analysisConfig: [
          {
            key: "forecast",
            type: "admin",
          },
        ],
      },
    ],
  },
];

const updates = [
  {
    layer: GFS_PRECIPITATION_FORECAST,
    getTimestamps: (params = {}, token) => {
      return fetchTimestamps(dataPath).then((res) => {
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
