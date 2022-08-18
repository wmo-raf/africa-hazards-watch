export default [
  {
    id: "mean_temp_value",
    dataset: "mean_temp_value",
    name: "Projected Average Temperature",
    layer: "mean_temp_value",
    active: true,
    category: 2,
    sub_category: 2,
    metadata: "6911c960-a55e-4674-a94d-2d5a71e26ec0",
    citation: "Projected average temperature for different climate scenarios ",
    layers: [
      {
        name: "Projected Average Temperature",
        id: "mean_temp_value",
        dataset: "mean_temp_value",
        layerConfig: {
          type: "vector",
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              "https://eahazardswatch.icpac.net/pg/tileserv/eagrid.tas_rcp_period/{z}/{x}/{y}.pbf?rcp={rcp}&period={period}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                type: "fill",
                "source-layer": "eagrid.tas_rcp_period",
                paint: {
                  "fill-color": {
                    type: "interval",
                    property: "val",
                    stops: [
                      [-10, "#FEFEC6"],
                      [-9, "#FEFCC2"],
                      [-8, "#FEFABD"],
                      [-7, "#F3F5B1"],
                      [-6, "#FDF1A6"],
                      [-5, "#FCED9D"],
                      [-4, "#FBE893"],
                      [-3, "#FBE188"],
                      [-2, "#FADC80"],
                      [-1, "#F9D577"],
                      [0, "#F7CD6D"],
                      [1, "#F5C666"],
                      [2, "#F3BD60"],
                      [3, "#F1B55C"],
                      [4, "#EFAD58"],
                      [5, "#EEA856"],
                      [6, "#EDA053"],
                      [7, "#EC9B52"],
                      [8, "#EA9351"],
                      [9, "#E98A4F"],
                      [10, "#E8864F"],
                      [11, "#E7824E"],
                      [12, "#E57A4D"],
                      [13, "#E2724C"],
                      [14, "#DE6A4B"],
                      [15, "#DB654A"],
                      [16, "#D45E48"],
                      [17, "#D15948"],
                      [18, "#C85146"],
                      [19, "#C14D44"],
                      [20, "#B84842"],
                      [21, "#B14440"],
                      [22, "#A23F3D"],
                      [23, "#9C3C3B"],
                      [24, "#8E3A37"],
                      [25, "#863835"],
                      [26, "#7C3531"],
                      [27, "#75342F"],
                      [28, "#68302A"],
                      [29, "#612E27"],
                      [30, "#542B23"],
                      [31, "#502921"],
                      [32, "#45271D"],
                      [33, "#3D2519"],
                      [34, "#362217"],
                      [35, "#2F2114"],
                      [36, "#281E11"],
                      [37, "#261D10"],
                      [38, "#221C0E"],
                      [39, "#1D1A07"],
                      [40, "#1B1905"],
                      [100, "#191803"],
                    ],
                  },
                },
              },
            ],
          },
        },
        params: {
          rcp: "8.5",
          period: "long",
        },
        paramsSelectorConfig: [
          {
            key: "rcp",
            type: "radio",
            options: [
              {
                label: "Low Emission Scenario (RCP 2.6)",
                value: "2.6",
                description:
                  "Best case scenario, radical changes in our behaviors and economies take place. Warming below 2 degrees by 2100.",
              },
              {
                label: "Medium Emission Scenario (RCP 4.5)",
                value: "4.5",
                description:
                  "Implementation of some climate policies including emission reduction and change of behavior. Warming between 2-3 degrees by 2100",
              },
              {
                label: "High Emission Scenario (RCP 8.5)",
                value: "8.5",
                description:
                  "No climate policies, energy intensive behaviors. We continue with business as usual. Warming over 3 degrees by 2100.",
              },
            ],
            required: true,
            sentence: "Scenario {selector}",
          },
          {
            key: "period",
            type: "radio",
            options: [
              {
                label: "Short Term Warming (until 2040)",
                value: "near",
                description:
                  "Warming that will happen between 2021-2040 most likely as a result of the emissions that are already in the atmosphere",
              },
              {
                label: "Medium Term Warming (until 2060)",
                value: "medium",
                description:
                  "Warming that will happen by 2060 as a result of emissions already in the atmosphere and policies implemented/not implemented from the present",
              },
              {
                label: "Long Term Warming (until 2100)",
                value: "long",
                description:
                  " Warming that will happen by 2100 significantly influenced by implementation/lack of implementation of set policies from the present",
              },
            ],
            required: true,
            sentence: "Period {selector}",
          },
        ],
        paramsSelectorColumnView: true,
        legendConfig: {
          items: [
            {
              color: "#FEFEC6",
              name: "< 0",
            },
            {
              color: "#F7CD6D",
              name: "0",
            },
            {
              color: "#E8864F",
              name: "10",
            },
            {
              color: "#B84842",
              name: "20",
            },
            {
              color: "#542B23",
              name: "30",
            },
            {
              color: "#1B1905",
              name: "> 40 °C",
            },
          ],
          type: "gradient",
        },
        analysisConfig: [
          {
            config: {
              wpsIdPrefix: "tas_val",
            },
            key: "timeseries",
            type: "point",
            variable: "tas",
          },
          {
            config: {
              wpsIdPrefix: "tas_val",
            },
            key: "timeseries",
            type: "admin",
            variable: "tas",
          },
        ],
      },
    ],
  },
];
