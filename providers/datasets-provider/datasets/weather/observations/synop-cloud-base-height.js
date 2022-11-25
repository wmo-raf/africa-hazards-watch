export default [
  {
    name: "Cloud Base Height",
    id: "3_hour_cloud_base_height",
    dataset: "3_hour_cloud_base_height",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "3_hour_cloud_base_height",
    citation: "GTS Synop, 3 Hourly",
    category: 1,
    sub_category: 4,
    metadata: "ecf74a56-2106-441e-8932-44b68a57c197",
    layers: [
      {
        id: "3_hour_cloud_base_height",
        dataset: "3_hour_cloud_base_height",
        name: "3 Hour Cloud Base Height",
        type: "layer",
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
          time: "2022-10-03 03:00",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: ["2022-10-03 03:00", "2022-10-03 06:00"],
          },
        ],
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "cloud_base_height", property: "Humidity (%)" },
          ],
        },
      },
    ],
  },
];
