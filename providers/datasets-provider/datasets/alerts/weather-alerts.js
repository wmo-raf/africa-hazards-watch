const category = "alerts";
const subCategory = "alerts";

export default [
  {
    id: "cap_alerts",
    dataset: "cap_alerts",
    name: "Severe Weather Alerts",
    layer: "cap_alerts",
    initialVisible: true,
    isCapAlert: true,
    metadata: "",
    category: category,
    sub_category: subCategory,
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
            data: "http://197.254.13.228:3200/api/v1/alerts",
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
                  "fill-opacity": 1,
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
