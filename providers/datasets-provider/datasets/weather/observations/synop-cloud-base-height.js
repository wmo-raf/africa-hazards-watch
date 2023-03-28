import { PG_WEATHER_FEATURESERV_URL } from "utils/apis";
import { fetchSynopTimestamps } from "services/timestamps";

import { OBS_SYNOPTIC_CLOUD_BASE_HEIGHT } from "data/layers";

const datasetName = "Cloud Base Height";
const layerName = OBS_SYNOPTIC_CLOUD_BASE_HEIGHT;
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = "weather";
const subCategory = "synop-observations";

const dataPath = "/cloud_base_height";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "GTS Synop, 3 Hourly",
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        citation: "",
        default: false,
        dataset: layerName,
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              `${PG_WEATHER_FEATURESERV_URL}/public.hourly_cloud_base_height/{z}/{x}/{y}.pbf?selected_date={time}`,
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "default",
                metadata: {
                  position: "top",
                },
                type: "circle",
                paint: {
                  "circle-stroke-color": "#fff",
                  "circle-stroke-width": 0.8,
                  "circle-radius": {
                    base: 4,
                    stops: [
                      [12, 9],
                      [22, 180],
                    ],
                  },
                  "circle-color": [
                    "case",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 15000],
                    "rgb(96,208,204)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 10000],
                    "rgb(75,197,153)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 7000],
                    "rgb(56,185,101)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 5000],
                    "rgb(34,174,51)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 3500],
                    "rgb(112,199,39)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 2500],
                    "rgb(159,218,59)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 1500],
                    "rgb(207,236,78)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 700],
                    "rgb(207,255,21)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 500],
                    "rgb(254,255,98)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 300],
                    "rgb(252,222,2)",
                    [">=", ["to-number", ["get", "cloud_base_height"]], 200],
                    "rgb(255,153,0)",
                    [">", ["to-number", ["get", "cloud_base_height"]], 0],
                    "#ff0200",
                    "#fff",
                  ],
                },
              },

              {
                "source-layer": "default",
                metadata: {
                  position: "top",
                },
                type: "symbol",
                layout: {
                  "text-field": "{cloud_base_height}",
                  "text-font": ["Noto Sans Regular"],
                  "text-size": 6,
                  "text-allow-overlap": false,

                  // "icon-text-fit":"both"
                },
              },
            ],
          },
        },
        legendConfig: {
          type: "choropleth",
          items: [
            { name: "", color: "#ff0200" },
            { name: 200, color: "rgb(255,153,0)" },
            { name: "", color: "rgb(252,222,2)" },
            { name: 500, color: "rgb(254,255,98)" },
            { name: "", color: "rgb(207,255,21)" },
            { name: 700, color: "rgb(207,236,78)" },
            { name: "", color: "rgb(159,218,59)" },
            { name: 2500, color: "rgb(112,199,39)" },
            { name: "", color: "rgb(34,174,51)" },
            { name: 5000, color: "rgb(56,185,101)" },
            { name: "", color: "rgb(75,197,153)" },
            { name: "10000m", color: "rgb(96,208,204)" },
          ],
        },
        params: {
          time: "",
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
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            {
              column: "cloud_base_height",
              property: "Base height",
              units: "m",
            },
            { column: "message", property: "Message" },
          ],
        },
      },
    ],
  },
];

const updates = [
  {
    layer: OBS_SYNOPTIC_CLOUD_BASE_HEIGHT,
    getTimestamps: (params = {}, token) => {
      return fetchSynopTimestamps(dataPath).then((res) => {
        const timestamps = (res.data && res.data.timestamps) || [];

        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      const now = new Date().setMinutes(0, 0, 0);

      const nowDate = new Date(now).toISOString();

      const hasDate = timestamps.includes(nowDate);

      if (hasDate) {
        return nowDate;
      }

      return timestamps[timestamps.length - 1];
    },
    updateInterval: 900000, // 15 minutes
  },
];

export default { datasets, updates };
