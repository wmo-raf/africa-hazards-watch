export default [
  {
    name: "Airports",
    id: "africa_airports",
    dataset: "africa_airports",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "africa_airports",
    category: 7,
    sub_category: 16,
    metadata: "ecf74a56-2106-441e-8932-44b68a57c197",
    layers: [
      {
        id: "africa_airports",
        dataset: "africa_airports",
        name: "Airports",
        type: "layer",
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              "https://eahazardswatch.icpac.net/pg/tileserv/pgadapter.africa_airports/{z}/{x}/{y}.pbf",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "pgadapter.africa_airports",
                filter: ["all", ["==", "type", "large_airport"]],
                layout: {
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                  "icon-image": "airport-1",
                  "icon-size": 0.9,
                },
                metadata: {
                  position: "top",
                },
                type: "symbol",
              },
              {
                "source-layer": "pgadapter.africa_airports",
                filter: ["all", ["==", "type", "medium_airport"]],
                layout: {
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                  "icon-image": "airport-1",
                  "icon-size": 0.6,
                },
                metadata: {
                  position: "top",
                },
                type: "symbol",
              },
            ],
          },
        },
        legendConfig: {
          items: [
            {
              icon: "/assets/layer-icons/airport-1.svg",
              name: "Airport",
            },
          ],
          type: "basic",
        },
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "type", property: "Type" },
          ],
        },
      },
    ],
  },
];
