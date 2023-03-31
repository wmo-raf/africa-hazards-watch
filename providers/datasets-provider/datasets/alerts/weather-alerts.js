const category = "alerts";
const subCategory = "cap_alerts";

const datasets = [
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
    global: true,
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
            data: "http://20.56.94.119/api/cap-alerts",
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
                filter: ["in", ["get", "severity"], ["literal", [5, 4, 3, 2]]],
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
                filter: ["in", ["get", "severity"], ["literal", [5, 4, 3, 2]]],
              },
            ],
          },
        },
        layerFilterParams: {
          severity: [
            { label: "Extreme", value: 4 },
            { label: "Severe", value: 3 },
            { label: "Moderate", value: 2 },
          ],
        },
        layerFilterParamsConfig: [
          {
            isMulti: true,
            type: "checkbox",
            key: "severity",
            required: true,
            default: [
              { label: "Extreme", value: 4 },
              { label: "Severe", value: 3 },
              { label: "Moderate", value: 2 },
            ],
            sentence: "Filter by Severity {selector}",
            options: [
              { label: "Extreme", value: 4 },
              { label: "Severe", value: 3 },
              { label: "Moderate", value: 2 },
              { label: "Minor", value: 1 },
              { label: "Unknown", value: 0 },
            ],
          },
        ],
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

const updates = [
  {
    layer: "cap_alerts",
    getData: async (token) => {
      const timestamp = new Date().getTime();

      return `http://20.56.94.119/api/cap-alerts/?timestamp=${timestamp}`;
    },
    updateInterval: 1000 * 60 * 5, // every 5 minutes
    // updateInterval: 1000 * 6, // every 5 minutes
    zoomToDataExtent: false,
  },
];

export default { datasets, updates };
