export default [
  {
    name: "Liquid Precipitation",
    id: "3_hour_liquid_precipitation",
    dataset: "3_hour_liquid_precipitation",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "3_hour_liquid_precipitation",
    citation: "GTS Synop, 3 Hourly",
    category: 1,
    sub_category: 4,
    metadata: "ecf74a56-2106-441e-8932-44b68a57c197",
    layers: [
      {
        id: "3_hour_liquid_precipitation",
        dataset: "3_hour_liquid_precipitation",
        name: "3 Hour Liquid Precipitation",
        type: "layer",
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
            { column: "liquid_precipitation", property: "Precipitation (mm)" },
          ],
        },
      },
    ],
  },
];
