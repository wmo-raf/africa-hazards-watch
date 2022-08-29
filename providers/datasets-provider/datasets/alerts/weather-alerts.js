import alertsData from "./alerts.json";

const category = 99;
const subCategory = 1;

export default [
  {
    id: "cap_alerts",
    dataset: "cap_alerts",
    name: "CAP Alerts",
    layer: "cap_alerts",
    category: category,
    sub_category: subCategory,
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
            data: alertsData,
          },
          render: {
            layers: [
              {
                paint: {
                  "fill-color": [
                    "match",
                    ["get", "severity"], // get the property
                    "extreme",
                    "#d72f2a",
                    "severe",
                    "#fe9900",
                    "moderate",
                    "#ffff00",
                    "minor",
                    "#03ffff",
                    "#3366ff",
                  ],
                },
                type: "fill",
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
