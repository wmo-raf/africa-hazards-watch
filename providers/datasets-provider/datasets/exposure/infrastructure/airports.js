const category = "exposure";
const subCategory = "infrastructure";
const metadataId = "f785b493-847c-49a8-9b77-56a75b934368";

const datasets = [
  {
    name: "Airports",
    id: "africa_airports",
    dataset: "africa_airports",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "africa_airports",
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    global: true,
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
              "http://20.56.94.119/pg4w/tileserv/pgadapter.africa_airports/{z}/{x}/{y}.pbf",
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

export default { datasets };
