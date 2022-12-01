import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Relative Humidity";
const layerName = "3_hour_humidity";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/humidity";

const generateLayers = (timestamps = []) => {
  const latest = timestamps[timestamps.length - 1];

  if (!latest) {
    return [];
  }

  const time = parseISO(latest);
  const end = addDays(time, 7);
  const dateFormat = "mmm, yyyy";

  const periodStr = `Latest: ${format(time, dateFormat)} to ${format(
    end,
    dateFormat
  )}`;

  return [
    {
      name: datasetName,
      id: layerName,
      type: "layer",
      citation: periodStr,
      default: false,
      dataset: layerName,
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              "http://localhost:7800/public.hourly_humidity/{z}/{x}/{y}.pbf?selected_date={time}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "public.hourly_humidity",
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
                    [">=", ["to-number", ["get", "humidity"]], 95.0],
                    "rgb(5, 48, 97)",
                    [">=", ["to-number", ["get", "humidity"]], 85.0],
                    "rgb(33, 102, 172)",
                    [">=", ["to-number", ["get", "humidity"]], 65.0],
                    "rgb(146, 197, 222)",
                    [">=", ["to-number", ["get", "humidity"]], 55.0],
                    "rgb(209, 229, 240)",
                    [">=", ["to-number", ["get", "humidity"]], 45.0],
                    "rgb(247, 247, 247)",
                    [">=", ["to-number", ["get", "humidity"]], 35.0],
                    "rgb(254, 227, 145)",
                    [">=", ["to-number", ["get", "humidity"]], 25.0],
                    "rgb(254, 196, 79)",
                    [">=", ["to-number", ["get", "humidity"]], 15.0],
                    "rgb(254, 153, 41)",
                    [">=", ["to-number", ["get", "humidity"]], 7.5],
                    "rgb(236, 112, 20)",
                    [">=", ["to-number", ["get", "humidity"]], 3.5],
                    "rgb(204, 76, 2)",
                    [">=", ["to-number", ["get", "humidity"]], 1.5],
                    "rgb(153, 52, 4)",
                    [">=", ["to-number", ["get", "humidity"]], 0.75],
                    "rgb(103, 38, 11)",
                    [">=", ["to-number", ["get", "humidity"]], 0.25],
                    "rgb(166, 15, 20)",
                    [">=", ["to-number", ["get", "humidity"]], 0],
                    "rgb(229, 59, 46)",
                    "#fff"
                  ]
                }
              },
              {
                "source-layer": "public.hourly_humidity",
                metadata: {
                  position: "top",
                },
                type: "symbol",
                layout: {
                  "text-field": "{humidity}",
                  "text-font": ["Noto Sans Regular"],
                  'text-size': 6,
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
            { name: "", color: "rgb(229, 59, 46)" },
            { name: 0.25, color: "rgb(166, 15, 20)" },
            { name: "", color: "rgb(103, 38, 11)" },
            { name: 1.5, color: "rgb(153, 52, 4)" },
            { name: "", color: "rgb(204, 76, 2)" },
            { name: 7.5, color: "rgb(236, 112, 20)" },
            { name: "", color: "rgb(254, 153, 41)" },
            { name: 25, color: "rgb(254, 196, 79)" },
            { name: "", color: "rgb(254, 227, 145)" },
            { name: 45, color: "rgb(247, 247, 247)" },
            { name: "", color: "rgb(209, 229, 240)" },
            { name: 65, color: "rgb(146, 197, 222)" },
            { name: "", color: "rgb(33, 102, 172)" },
            { name: "100 %", color: "rgb(5, 48, 97)" },
          ],
        },
        params: {
          time: `2022-11-24T18:00:00Z`,
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates:timestamps,
          },
        ],
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "humidity", property: "Humidity", units:"%"},
            { column: "message", property: "Message", },
          ],
        },
      },
    ]
  }

  export default [
    {
      name: datasetName,
      id: layerName,
      dataset: layerName,
      layer: layerName,
      category,
      sub_category: subCategory,
      metadata: metadataId,
      citation: "GTS Synop, 3 Hourly",
      getLayers: async () => {
        return await fetchSynopTimestamps(dataPath)
          .then((res) => {
            const timestamps = (res.data && res.data.timestamps) || [];

            return generateLayers(timestamps);

          })
          .catch(() => {
            return generateLayers([]);
          });
      },
    },
  ];

