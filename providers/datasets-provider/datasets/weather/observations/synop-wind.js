import { parseISO, format, addDays } from "date-fns";

const datasetName = "Wind Speed & Direction";
const layerName = "3_hour_wind";

export const windSpeedDirection = (timestamps = []) => {
  const latest = timestamps[timestamps.length - 1];

  if (!latest) {
    return [];
  }

  const time = parseISO(latest);
  const end = addDays(time, 7);
  const dateFormat = "mmm, yyyy";

  const periodStr = `Latest: ${format(time, dateFormat)} to ${format(
    end,
    dateFormat
  )}`;

  return [

    {
      name: datasetName,
      id: layerName,
      type: "layer",
      citation: periodStr,
      default: false,
      dataset: 'synoptic_charts',
      active: false,
      "isMultiLayer": true,
      "nestedLegend": true,
      layerConfig: {
        type: "vector",
        source: {
          tiles: [
            "http://localhost:7800/public.hourly_wind/{z}/{x}/{y}.pbf?selected_date={time}",
          ],
          type: "vector",
        },
        render: {
          layers: [
            {
              'type': 'symbol',
              "source-layer": "public.hourly_wind",
              metadata: {
                position: "top",
              },
              'paint': {
                // 'icon-opacity': 0.8 + b * 0.008,
                // 'icon-color': 'red'

              },
              'layout': {
                "icon-image":[
                  "case",
                  [">=", ["to-number", ["get", "wind_speed"]], 107],
                  "barbs-22",
                  [">=", ["to-number", ["get", "wind_speed"]], 103],
                  "barbs-21",
                  [">=", ["to-number", ["get", "wind_speed"]], 97],
                  "barbs-20",
                  [">=", ["to-number", ["get", "wind_speed"]], 93],
                  "barbs-19",
                  [">=", ["to-number", ["get", "wind_speed"]], 87],
                  "barbs-18",
                  [">=", ["to-number", ["get", "wind_speed"]], 83],
                  "barbs-17",
                  [">=", ["to-number", ["get", "wind_speed"]], 78],
                  "barbs-16",
                  [">=", ["to-number", ["get", "wind_speed"]], 73],
                  "barbs-15",
                  [">=", ["to-number", ["get", "wind_speed"]], 68],
                  "barbs-14",
                  [">=", ["to-number", ["get", "wind_speed"]], 63],
                  "barbs-13",
                  [">=", ["to-number", ["get", "wind_speed"]], 58],
                  "barbs-12",
                  [">=", ["to-number", ["get", "wind_speed"]], 53],
                  "barbs-11",
                  [">=", ["to-number", ["get", "wind_speed"]], 48],
                  "barbs-10",
                  [">=", ["to-number", ["get", "wind_speed"]], 43],
                  "barbs-09",
                  [">=", ["to-number", ["get", "wind_speed"]], 38],
                  "barbs-08",
                  [">=", ["to-number", ["get", "wind_speed"]], 33],
                  "barbs-07",
                  [">=", ["to-number", ["get", "wind_speed"]], 28],
                  "barbs-06",
                  [">=", ["to-number", ["get", "wind_speed"]], 23],
                  "barbs-05",
                  [">=", ["to-number", ["get", "wind_speed"]], 18],
                  "barbs-04",
                  [">=", ["to-number", ["get", "wind_speed"]], 8],
                  "barbs-03",
                  [">=", ["to-number", ["get", "wind_speed"]], 3],
                  "barbs-02",
                  [">=", ["to-number", ["get", "wind_speed"]], 0],
                  "okta-0",
                  "okta-0",
                ],
                'icon-size':[
                  "case",
                  [">=", ["to-number", ["get", "wind_speed"]], 3],
                  ["literal", 0.4],
                  ["literal", 0.1],
                ] ,
                'icon-allow-overlap': true,
                'icon-rotation-alignment': 'map',
                'icon-rotate': {
                  'property': 'wind_direction',
                  'stops': [[0, 90], [360, 450]]
                },
                "icon-anchor": 'bottom',
                "icon-offset":[
                  "case",
                  [">=", ["to-number", ["get", "wind_speed"]], 3],
                  ["literal", [5,-15]],
                  ["literal", [0,65]],
                ]
              }

            },
          ]
        }
      },
      legendConfig: {
        type: "",
        items: []
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
          availableDates: timestamps
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
    }
  ]
}

