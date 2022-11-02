const category = "alerts";
const subCategory = "alerts";

const layerId = "tropical_cyclones";

export default [
  {
    id: layerId,
    dataset: layerId,
    name: "Tropical Cyclones",
    layer: layerId,
    initialVisible: true,
    metadata: layerId,
    category: category,
    sub_category: subCategory,
    layers: [
      {
        id: layerId,
        dataset: layerId,
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
                metadata: {
                  hoverable: true,
                },
              },
            ],
          },
        },
        legendConfig: {
          items: [
            {
              name: "Tropical Depression",
              color: "#8fc2f2",
            },
            {
              name: "Tropical Storm",
              color: "#3f85d3",
            },
            {
              name: "Category 1 - Very dangerous winds",
              color: "#f9ff05",
            },
            {
              name: "Category 2 - Extremely dangerous winds",
              color: "#f49e08",
            },
            {
              name: "Category 3 - Devastating damage",
              color: "#dd0101",
            },
            {
              name: "Category 4 - Catastrophic damage",
              color: "#f701fc",
            },
            {
              name: "Category 5 - Catastrophic damage",
              color: "#8b0088",
            },
          ],
          type: "basic",
        },
        hoverInteractionConfig: {
          output: [
            {
              column: "date",
              property: "Date",
              type: "date",
              format: "MMM dd, h b",
              hideLabel: true,
            },
            {
              column: "wind",
              hideLabel: true,
              units: "km/h",
            },
          ],
        },
      },
    ],
  },
];
