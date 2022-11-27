import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Dew Point Temperature";
const layerName = "dewpoint_temperature";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/dewpoint_temperature";

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
            "http://localhost:7800/public.hourly_dew_temperature/{z}/{x}/{y}.pbf?selected_date={time}",
          ],
          type: "vector",
        },
        render: {
          layers: [

            {
              "source-layer": "public.hourly_dew_temperature",
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
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 53],
                  "rgb(229, 59, 46)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 47],
                  "rgb(166, 15, 20)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 41],
                  "rgb(103, 38, 11)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 35],
                  "rgb(153, 52, 4)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 29],
                  "rgb(204, 76, 2)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 17],
                  "rgb(236, 112, 20)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 11],
                  "rgb(254, 153, 41)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], 5],
                  "rgb(254, 196, 79)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], -1],
                  "rgb(254, 227, 145)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], -5],
                  "rgb(247, 247, 247)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], -13],
                  "rgb(209, 229, 240)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], -19],
                  "rgb(146, 197, 222)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], -32.5],
                  "rgb(33, 102, 172)",
                  [">=", ["to-number", ["get", "dewpoint_temperature"]], -55],
                  "rgb(5, 48, 97)",
                  "#fff"
                ]

              }
            },

            {
              "source-layer": "public.hourly_dew_temperature",
              metadata: {
                position: "top",
              },
              type: "symbol",
              layout: {
                "text-field": "{dewpoint_temperature}",
                "text-font": ["Noto Sans Regular"],
                'text-size': 6,
                "text-allow-overlap": false,

                // "icon-text-fit":"both"
              }

            },


          ],

        },
      },
      legendConfig: {
        type: "choropleth",
        items: [
          { name: "", color: "rgb(5, 48, 97)" },
          { name: -32.5, color: "rgb(33, 102, 172)" },
          { name: "", color: "rgb(146, 197, 222)" },
          { name: -13, color: "rgb(209, 229, 240)" },
          { name: "", color: "rgb(247, 247, 247)" },
          { name: -1, color: "rgb(254, 227, 145)" },
          { name: "", color: "rgb(254, 196, 79)" },
          { name: 11, color: "rgb(254, 153, 41)" },
          { name: "", color: "rgb(236, 112, 20)" },
          { name: 29, color: "rgb(204, 76, 2)" },
          { name: "", color: "rgb(153, 52, 4)" },
          { name: 41, color: "rgb(103, 38, 11)" },
          { name: "", color: "rgb(166, 15, 20)" },
          { name: "53 °C", color: "rgb(229, 59, 46)" },
        ],
      },
      params: {
        time: `${latest}`,
      },
      paramsSelectorColumnView: true,
      paramsSelectorConfig: [
        {
          key: "time",
          required: true,
          sentence: "{selector}",
          type: "datetime",
          dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
          availableDates: timestamps,
        },
      ],
      interactionConfig: {
        output: [
          { column: "name", property: "Name" },
          { column: "dewpoint_temperature", property: "Dew Temperature (°C)" },
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
