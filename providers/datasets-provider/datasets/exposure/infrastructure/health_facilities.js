const category = "exposure";
const subCategory = "infrastructure";
const metadataId = "de5afc2e-55ea-41f7-a3fe-1d03717e70fb";

const datasets = [
  {
    name: "Health Facilities",
    id: "africa_health_facilities",
    dataset: "africa_health_facilities",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "africa_health_facilities",
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    global: true,
    layers: [
      {
        id: "africa_health_facilities",
        dataset: "africa_health_facilities",
        name: "Health Facilities",
        type: "layer",
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              "http://20.56.94.119/pg4w/tileserv/pgadapter.africa_healthsites/{z}/{x}/{y}.pbf",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                "source-layer": "pgadapter.africa_healthsites",
                filter: ["all", ["==", "amenity", "hospital"]],
                layout: {
                  "icon-allow-overlap": false,
                  "icon-ignore-placement": false,
                  "icon-image": "hospital-1",
                  "icon-size": 0.5,
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
              icon: "/assets/layer-icons/hospital-1.svg",
              name: "Hospital",
            },
          ],
          type: "basic",
        },
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "amenity", property: "Type" },
          ],
          type: "intersection",
        },
      },
    ],
  },
];

export default { datasets };
