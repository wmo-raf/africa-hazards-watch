import { fetchEcwmfSynopTimestamps } from "services/timestamps";

const datasetName = "Cloud Base Height";
const layerName = "ecmwf_synop_cloud_base_height";
const metadataId = "1289e783-adb8-4c1a-89ce-dc3a32590243";

const category = "weather";
const subCategory = "synop-observations";

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
    global: true,
    capabilities: ["timeseries"],
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
              `http://20.56.94.119/pg4w/tileserv/public.synop_obs/{z}/{x}/{y}.pbf?date={time}`,
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
                filter: ["has", "height_of_base_of_cloud"],
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
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      15000,
                    ],
                    "rgb(96,208,204)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      10000,
                    ],
                    "rgb(75,197,153)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      7000,
                    ],
                    "rgb(56,185,101)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      5000,
                    ],
                    "rgb(34,174,51)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      3500,
                    ],
                    "rgb(112,199,39)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      2500,
                    ],
                    "rgb(159,218,59)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      1500,
                    ],
                    "rgb(207,236,78)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      700,
                    ],
                    "rgb(207,255,21)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      500,
                    ],
                    "rgb(254,255,98)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      300,
                    ],
                    "rgb(252,222,2)",
                    [
                      ">=",
                      ["to-number", ["get", "height_of_base_of_cloud"]],
                      200,
                    ],
                    "rgb(255,153,0)",
                    [">", ["to-number", ["get", "height_of_base_of_cloud"]], 0],
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
                filter: ["has", "height_of_base_of_cloud"],
                type: "symbol",
                layout: {
                  "text-field": "{height_of_base_of_cloud}",
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
              column: "height_of_base_of_cloud",
              property: "Base height",
              units: "m",
            },
          ],
        },
      },
    ],
  },
];

const updates = [
  {
    layer: layerName,
    getTimestamps: (params = {}, token) => {
      return fetchEcwmfSynopTimestamps().then((res) => {
        const timestamps = res.data || [];

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
