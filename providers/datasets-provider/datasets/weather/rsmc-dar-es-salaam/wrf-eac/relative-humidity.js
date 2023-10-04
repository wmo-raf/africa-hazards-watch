import { fetchTileJsonTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Relative Humidity";
const layerName = "rsmc_dar_wrf_eac_rh";
const metadataId = "";
const tileJsonUrl =
  "http://20.56.94.119/hw-cms/api/raster/04b170a7-5a6f-4eed-88c7-270b4ad576bb/tiles.json";

const category = "weather";
const subCategory = "rsmc-dar";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "",
    group: "wrf-eac",
    // initialVisible: true,
    capabilities: ["timeseries"],
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
              "http://20.56.94.119/hw-cms/api/raster-tiles/04b170a7-5a6f-4eed-88c7-270b4ad576bb/{z}/{x}/{y}?time={time}",
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "choropleth",
          title: "%",
          items: [
            {
              name: 60.0,
              color: "#ffffff",
            },
            {
              name: 70.0,
              color: "#dff3da",
            },
            {
              name: 80.0,
              color: "#cbeac4",
            },
            {
              name: 90.0,
              color: "#7acbc3",
            },
            {
              name: 95.0,
              color: "#2e8bbd",
            },
            {
              name: "",
              color: "#0f68aa",
            },
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
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
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
      return fetchTileJsonTimestamps(tileJsonUrl).then((res) => {
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
