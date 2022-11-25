export default [
  {
    name: "Relative Humidity",
    id: "3_hour_humidity",
    dataset: "3_hour_humidity",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "3_hour_humidity",
    citation: "GTS Synop, 3 Hourly",
    category: 1,
    sub_category: 4,
    metadata: "ecf74a56-2106-441e-8932-44b68a57c197",
    layers: [
      {
        id: "3_hour_humidity",
        dataset: "3_hour_humidity",
        name: "3 Hour Humidity",
        type: "layer",
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
            { column: "humidity", property: "Humidity (%)" },
          ],
        },
      },
    ],
  },
];
