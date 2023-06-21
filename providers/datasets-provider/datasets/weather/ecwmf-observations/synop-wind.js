const datasetName = "Wind Speed & Direction";
const layerName = "3_hour_wind";

export const windSpeedDirection = (timestamps = []) => {
  const latest = "";

  return [
    {
      name: datasetName,
      id: layerName,
      type: "layer",
      citation: "",
      default: false,
      dataset: "synoptic_charts",
      active: false,
      isMultiLayer: true,
      nestedLegend: true,
      layerConfig: {
        type: "vector",
        source: {
          tiles: [
            `http://20.56.94.119/pg4w/tileserv/public.synop_obs/{z}/{x}/{y}.pbf?date={time}`,
          ],
          type: "vector",
        },
        render: {
          layers: [
            {
              type: "symbol",
              "source-layer": "default",
              metadata: {
                position: "top",
              },
              filter: ["has", "wind_speed"],
              paint: {
                // 'icon-opacity': 0.8 + b * 0.008,
                // 'icon-color': 'red'
              },
              layout: {
                "icon-image": [
                  "case",
                  [">=", ["to-number", ["get", "wind_speed"]], 107 / 1.944],
                  "barbs-22",
                  [">=", ["to-number", ["get", "wind_speed"]], 103 / 1.944],
                  "barbs-21",
                  [">=", ["to-number", ["get", "wind_speed"]], 97 / 1.944],
                  "barbs-20",
                  [">=", ["to-number", ["get", "wind_speed"]], 93 / 1.944],
                  "barbs-19",
                  [">=", ["to-number", ["get", "wind_speed"]], 87 / 1.944],
                  "barbs-18",
                  [">=", ["to-number", ["get", "wind_speed"]], 83 / 1.944],
                  "barbs-17",
                  [">=", ["to-number", ["get", "wind_speed"]], 78 / 1.944],
                  "barbs-16",
                  [">=", ["to-number", ["get", "wind_speed"]], 73 / 1.944],
                  "barbs-15",
                  [">=", ["to-number", ["get", "wind_speed"]], 68 / 1.944],
                  "barbs-14",
                  [">=", ["to-number", ["get", "wind_speed"]], 63 / 1.944],
                  "barbs-13",
                  [">=", ["to-number", ["get", "wind_speed"]], 58 / 1.944],
                  "barbs-12",
                  [">=", ["to-number", ["get", "wind_speed"]], 53 / 1.944],
                  "barbs-11",
                  [">=", ["to-number", ["get", "wind_speed"]], 48 / 1.944],
                  "barbs-10",
                  [">=", ["to-number", ["get", "wind_speed"]], 43 / 1.944],
                  "barbs-09",
                  [">=", ["to-number", ["get", "wind_speed"]], 38 / 1.944],
                  "barbs-08",
                  [">=", ["to-number", ["get", "wind_speed"]], 33 / 1.944],
                  "barbs-07",
                  [">=", ["to-number", ["get", "wind_speed"]], 28 / 1.944],
                  "barbs-06",
                  [">=", ["to-number", ["get", "wind_speed"]], 23 / 1.944],
                  "barbs-05",
                  [">=", ["to-number", ["get", "wind_speed"]], 18 / 1.944],
                  "barbs-04",
                  [">=", ["to-number", ["get", "wind_speed"]], 8 / 1.944],
                  "barbs-03",
                  [">=", ["to-number", ["get", "wind_speed"]], 3 / 1.944],
                  "barbs-02",
                  "okta-0",
                ],
                "icon-size": [
                  "case",
                  [">=", ["to-number", ["get", "wind_speed"]], 3 / 1.944],
                  ["literal", 0.4],
                  ["literal", 0.1],
                ],
                "icon-allow-overlap": true,
                "icon-rotation-alignment": "map",
                "icon-rotate": {
                  property: "wind_direction",
                  stops: [
                    [0, 90],
                    [360, 450],
                  ],
                },
                "icon-anchor": "bottom",
                "icon-offset": [
                  "case",
                  [">=", ["to-number", ["get", "wind_speed"]], 3 / 1.944],
                  ["literal", [5, -15]],
                  ["literal", [0, 65]],
                ],
              },
            },
          ],
        },
      },
      legendConfig: {
        type: "",
        items: [],
      },
      params: {
        time: `${latest}`,
      },

      paramsSelectorColumnView: true,
      paramsSelectorConfig: [
        {
          key: "time",
          required: true,
          sentence: "{selector}",
          type: "datetime",
          dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
          availableDates: timestamps,
        },
      ],

      timeParamSentenceConfig: {
        param: "time",
        format: "mmm, yyyy",
        add: 1,
        template: "Selected Period : {time}",
      },
      // data_path: dataPath,

      // interactionConfig: {
      //   output: [
      //     { column: "name", property: "Name" },
      //     { column: "wind_speed", property: "Speed (knots)" },
      //     { column: "wind_direction", property: "Direction (°)" },
      //   ],
      // },
    },
  ];
};
