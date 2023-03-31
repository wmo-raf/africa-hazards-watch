const category = "exposure";
const subCategory = "infrastructure";

const datasets = [
  {
    name: "Power Plants",
    id: "africa_power_plants",
    dataset: "africa_power_plants",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "africa_power_plants",
    category: 7,
    sub_category: 16,
    metadata: "6e150e1a-a6f5-4cc9-921d-84bd2e01ab12",
    global: true,
    layers: [
      {
        id: "africa_power_plants",
        dataset: "africa_power_plants",
        name: "Power Plants",
        type: "layer",
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              "http://20.56.94.119/pg4w/tileserv/pgadapter.africa_power_plants/{z}/{x}/{y}.pbf",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                layout: {
                  "icon-allow-overlap": false,
                  "icon-ignore-placement": true,
                  "icon-image": "electric-tower",
                  "icon-size": 0.7,
                },
                "source-layer": "pgadapter.africa_power_plants",
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
              icon: "/assets/layer-icons/electric-tower.svg",
              name: "Power Plant",
            },
          ],
          type: "basic",
        },
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "primary_fu", property: "Fuel" },
            {
              column: "commission",
              property: "Year",
              type: "number",
              suffix: "whole",
            },
            {
              column: "capacity_m",
              property: "Capacity MW",
              type: "number",
            },
          ],
          type: "intersection",
        },
      },
    ],
  },
];

export default { datasets };
