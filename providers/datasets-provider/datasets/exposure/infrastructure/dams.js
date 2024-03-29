const category = "exposure";
const subCategory = "infrastructure";
const metadataId = "5f9635f3-70c5-437d-926c-35619a488e1a";

const datasets = [
  {
    name: "Dams",
    id: "africa_dams",
    dataset: "africa_dams",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "africa_dams",
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    global: true,
    layers: [
      {
        id: "africa_dams",
        dataset: "africa_dams",
        name: "Dams",
        type: "layer",
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              "http://20.56.94.119/pg4w/tileserv/pgadapter.africa_dams/{z}/{x}/{y}.pbf",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "pgadapter.africa_dams",
                minzoom: 0,
                layout: {
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                  "icon-image": "dam",
                  "icon-size": 0.7,
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
              icon: "/assets/layer-icons/dam.svg",
              name: "Dam",
            },
          ],
          type: "basic",
        },
        interactionConfig: {
          output: [
            { column: "dam_name", property: "Dam name" },
            { column: "river", property: "River" },
            { column: "area_skm", property: "Area KM² " },
            { column: "main_basin", property: "Main Basin" },
            { column: "sub_basin", property: "Sub Basin" },
            { column: "year", property: "Year" },
          ],
          type: "intersection",
        },
      },
    ],
  },
];

export default { datasets };
