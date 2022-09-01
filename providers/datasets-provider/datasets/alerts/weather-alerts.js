import { getAlerts } from "services/cap-alerts";

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
    getLayers: async () => {
      return await getAlerts()
        .then((alertsData) => {
          return [
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
                      },
                      type: "fill",
                    },
                    {
                      paint: {
                        "line-color": [
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
                        "line-width": 1.5,
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
          ];
        })
        .catch(() => {
          return [];
        });
    },
  },
];
