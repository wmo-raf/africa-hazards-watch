import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Liquid Precipitation";
const layerName = "3_hour_liquid_precipitation";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/liquid_precipitation";

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
              "http://localhost:7800/public.hourly_liquid_precipitation/{z}/{x}/{y}.pbf?selected_date={time}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "public.hourly_liquid_precipitation",
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
                    [">=", ["to-number", ["get", "liquid_precipitation"]],5],
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
                    [">=", ["to-number", ["get", "liquid_precipitation"]], 0.25],
                    "rgb(193,251,251)",
                    [">=", ["to-string", ["get", "liquid_precipitation"]], "0"],
                    "rgb(193,251,251)",
                    // "rgb(255, 255, 255, 0)"
                    "transparent"

                  ]
                }
              },
              {
                "source-layer": "public.hourly_liquid_precipitation",
                metadata: {
                  position: "top",
                },
                type: "symbol",
                layout: {
                  "text-field": "{liquid_precipitation}",
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
            { column: "liquid_precipitation", property: "Precipitation (mm)" },
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
            console.log(timestamps)

            return generateLayers(timestamps);

          })
          .catch(() => {
            return generateLayers([]);
          });
      },
    },
  ];
