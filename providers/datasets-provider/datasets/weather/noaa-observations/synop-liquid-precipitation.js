import { PG_WEATHER_FEATURESERV_URL } from "utils/apis";
import { fetchSynopTimestamps } from "services/timestamps";

import { OBS_SYNOPTIC_LIQUID_PRECIPITATION } from "data/layers";

const datasetName = "Liquid Precipitation";
const layerName = OBS_SYNOPTIC_LIQUID_PRECIPITATION;
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = "weather";
const subCategory = "synop-observations";

const dataPath = "/liquid_precipitation";

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
              `${PG_WEATHER_FEATURESERV_URL}/public.hourly_liquid_precipitation/{z}/{x}/{y}.pbf?selected_date={time}`,
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
                  // "circle-stroke-opacity": 0.7,
                  "circle-radius": {
                    base: 4,
                    stops: [
                      [12, 9],
                      [22, 180],
                    ],
                  },
                  "circle-color": [
                    "case",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 30],
                    "rgb(252,67,52)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 25],
                    "rgb(255,129,52)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 20],
                    "rgb(255,189,53)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 15],
                    "rgb(225,255,92)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 10],
                    "rgb(191,255,53)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 7],
                    "rgb(53,209,77)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 5],
                    "rgb(52,172,159)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 3],
                    "rgb(52,134,221)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 2],
                    "rgb(53,150,254)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 1.5],
                    "rgb(123,149,249)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 1],
                    "rgb(135,169,253)",
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 0.5],
                    "rgb(156,249,246)",
                    [
                      ">=",
                      ["to-number", ["get", "liquid_precipitation"]],
                      0.25,
                    ],
                    "rgb(193,251,251)",
                    [">=", ["to-string", ["get", "liquid_precipitation"]], "0"],
                    "rgb(193,251,251)",
                    // "rgb(255, 255, 255, 0)"
                    "transparent",
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
                  "text-field": "{liquid_precipitation}",
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
            { name: "", color: "rgb(193,251,251)" },
            { name: 0.5, color: "rgb(156,249,246)" },
            { name: "", color: "rgb(135,169,253)" },
            { name: 1.5, color: "rgb(123,149,249)" },
            { name: "", color: "rgb(53,150,254)" },
            { name: 3, color: "rgb(52,134,221)" },
            { name: "", color: "rgb(52,172,159)" },
            { name: 7, color: "rgb(53,209,77)" },
            { name: "", color: "rgb(191,255,53)" },
            { name: 15, color: "rgb(225,255,92)" },
            { name: "", color: "rgb(255,189,53)" },
            { name: "25 mm", color: "rgb(255,129,52)" },
            { name: "", color: "rgb(252,67,52)" },
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
              column: "liquid_precipitation",
              property: "Precipitation",
              units: "mm",
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
    layer: OBS_SYNOPTIC_LIQUID_PRECIPITATION,
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
    updateInterval: 300000, // 5 minutes
  },
];

export default { datasets, updates };
