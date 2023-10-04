import { fetchTileJsonTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Precipitation Accumulated";
const layerName = "rsmc_dar_wrf_lake_victoria_precipitation_accumulated";
const metadataId = "";
const tileJsonUrl =
  "http://20.56.94.119/hw-cms/api/raster/1f3ca68f-1a86-4917-ae6d-44f0ad0d7110/tiles.json";

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
              "http://20.56.94.119/hw-cms/api/raster-tiles/1f3ca68f-1a86-4917-ae6d-44f0ad0d7110/{z}/{x}/{y}?time={time}",
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "choropleth",
          title: "mm",
          items: [
            {
              name: 1.0,
              color: "#ffffff",
            },
            {
              name: 5.0,
              color: "#c9ff6f",
            },
            {
              name: 10.0,
              color: "#a0cc5b",
            },
            {
              name: 20.0,
              color: "#7fff01",
            },
            {
              name: 30.0,
              color: "#00cb02",
            },
            {
              name: 40.0,
              color: "#268826",
            },
            {
              name: 50.0,
              color: "#f9f900",
            },
            {
              name: 60.0,
              color: "#fab514",
            },
            {
              name: 70.0,
              color: "#eb7500",
            },
            {
              name: 80.0,
              color: "#fc0001",
            },
            {
              name: "",
              color: "#880101",
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
