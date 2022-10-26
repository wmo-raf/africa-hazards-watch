const category = "alerts";
const subCategory = "alerts";

export default [
  {
    id: "tropical_cyclones",
    dataset: "tropical_cyclones",
    name: "Tropical Cyclones",
    layer: "tropical_cyclones",
    initialVisible: true,
    metadata: "",
    category: category,
    sub_category: subCategory,
    layers: [
      {
        id: "tropical_cyclones",
        dataset: "tropical_cyclones",
        name: "Tropical Cyclones",
        type: "layer",
        layerConfig: {
          type: "vector",
          source: {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] },
          },
          render: {
            layers: [
              {
                type: "line",
                paint: {
                  "line-color": ["get", "color"],
                  "line-width": 1.8,
                },
                filter: [
                  "all",
                  ["==", "forecast", false],
                  ["==", "$type", "LineString"],
                ],
              },
              {
                type: "line",
                paint: {
                  "line-color": ["get", "color"],
                  "line-width": 1.8,
                  "line-dasharray": [2, 1],
                },
                filter: [
                  "all",
                  ["==", "forecast", true],
                  ["==", "$type", "LineString"],
                ],
              },
              {
                type: "symbol",
                layout: {
                  "icon-image": "pulsing-dot",
                },
                filter: [
                  "all",
                  ["has", "currentPosition"],
                  ["==", "$type", "Point"],
                ],
              },
              {
                type: "circle",
                paint: {
                  "circle-color": ["get", "color"],
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#000",
                  "circle-radius": 5,
                },
                filter: ["==", "$type", "Point"],
              },
            ],
          },
        },
        legendConfig: {
          items: [],
          type: "basic",
        },
      },
    ],
  },
];
