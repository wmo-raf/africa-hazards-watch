export default [
  {
    id: "cap_alerts",
    dataset: "cap_alerts",
    name: "Show CAP Alerts",
    layer: "cap_alerts",
    initialVisible: true,
    isCapAlert: true,
    metadata: "",
    layers: [
      {
        id: "cap_alerts",
        dataset: "cap_alerts",
        name: "CAP Alerts",
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
                paint: {
                  "fill-color": [
                    "match",
                    ["get", "severity"], // get the property
                    4,
                    "#d72f2a",
                    3,
                    "#fe9900",
                    2,
                    "#ffff00",
                    1,
                    "#03ffff",
                    "#3366ff",
                  ],
                  "fill-opacity": 0.8,
                },
                type: "fill",
                // filter: ["==", "$type", "Polygon"],
              },
              {
                paint: {
                  "line-color": [
                    "match",
                    ["get", "severity"], // get the property
                    4,
                    "#ac2420",
                    3,
                    "#ca7a00",
                    2,
                    "#cbcb00",
                    1,
                    "#00cdcd",
                    "#003df4",
                  ],
                  "line-width": 0.1,
                },
                type: "line",
              },
            ],
          },
        },
        legendConfig: {
          items: [
            {
              color: "#d72f2a",
              name: "Extreme Severity",
            },
            {
              color: "#fe9900",
              name: "Severe Severity",
            },
            {
              color: "#ffff00",
              name: "Moderate Severity",
            },
            {
              color: "#03ffff",
              name: "Minor Severity",
            },
            {
              color: "#3366ff",
              name: "Unknown Severity",
            },
          ],
          type: "basic",
        },
        interactionConfig: {
          capAlert: true,
          type: "intersection",
        },
      },
    ],
  },
];
