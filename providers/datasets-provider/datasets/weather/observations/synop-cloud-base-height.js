import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Cloud Base Height";
const layerName = "3_hour_cloud_base_height";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/cloud_base_height";

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
              "http://localhost:7800/public.hourly_cloud_base_height/{z}/{x}/{y}.pbf?selected_date={time}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "public.hourly_cloud_base_height",
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
                  'circle-color': [
                    "case",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 15000],
                    "rgb(96,208,204)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 10000],
                    "rgb(75,197,153)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 7000],
                    "rgb(56,185,101)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 5000],
                    "rgb(34,174,51)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 3500],
                    "rgb(112,199,39)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 2500],
                    "rgb(159,218,59)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 1500],
                    "rgb(207,236,78)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 700],
                    "rgb(207,255,21)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 500],
                    "rgb(254,255,98)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 300],
                    "rgb(252,222,2)",
                    [">=", ["to-number", ["get", 'cloud_base_height']], 200],
                    "rgb(255,153,0)",
                    [">", ["to-number", ["get", 'cloud_base_height']], 0],
                    "#ff0200",
                    "#fff"
                  ]
                }
              },

              {
                "source-layer": "public.hourly_cloud_base_height",
                metadata: {
                  position: "top",
                },
                type: "symbol",
                layout: {
                  "text-field": "{cloud_base_height}",
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
            { column: "cloud_base_height", property: "Humidity (%)" },
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
