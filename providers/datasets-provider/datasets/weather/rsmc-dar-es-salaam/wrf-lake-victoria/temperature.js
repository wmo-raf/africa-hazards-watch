import { fetchTileJsonTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Temperature";
const layerName = "rsmc_dar_wrf_lake_victoria_temperature";
const metadataId = "";
const tileJsonUrl =
  "http://20.56.94.119/hw-cms/api/raster/bfcd4715-9606-4b5d-95bd-d861cec463f4/tiles.json";

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
    group: "wrf-lake-victoria",
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
              "http://20.56.94.119/hw-cms/api/raster-tiles/bfcd4715-9606-4b5d-95bd-d861cec463f4/{z}/{x}/{y}?time={time}",
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          title: "°C",
          type: "choropleth",
          items: [
            {
              name: 4.0,
              color: "#801fef",
            },
            {
              name: 8.0,
              color: "#0c18f9",
            },
            {
              name: 12.0,
              color: "#3375ed",
            },
            {
              name: 16.0,
              color: "#0daaff",
            },
            {
              name: 20.0,
              color: "#72c8f2",
            },
            {
              name: 24.0,
              color: "#ffffc8",
            },
            {
              name: 28.0,
              color: "#fed727",
            },
            {
              name: 32.0,
              color: "#ff9301",
            },
            {
              name: 36.0,
              color: "#ff2f01",
            },
            {
              name: 40.0,
              color: "#d10000",
            },
            {
              name: "",
              color: "#ffb1b1",
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
