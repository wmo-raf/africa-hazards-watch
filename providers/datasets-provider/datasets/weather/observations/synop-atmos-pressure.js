import { parseISO, format, addDays } from "date-fns";

const datasetName = "Atmospheric Pressure";
const layerName = "atmospheric_pressure";

export const atmosphericPressure = (timestamps = []) => {
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
      active:false,
      "isMultiLayer": true,
      "nestedLegend": true,
      layerConfig: {
        type: "vector",
        source: {
          tiles: [
            "http://localhost:7800/public.hourly_atm_pressure/{z}/{x}/{y}.pbf?selected_date={time}",
          ],
          type: "vector",
        },
        render: {
          layers: [

            // {
            //   "source-layer": "public.hourly_atm_pressure",
            //   metadata: {
            //     position: "top",
            //   },
            //   type: "circle",
            //   paint: {
            //     "circle-stroke-color": "#fff",
            //     "circle-stroke-width": 0.8,
            //     // "circle-stroke-opacity": 0.7,
            //     "circle-radius": {
            //       base: 4,
            //       stops: [
            //         [12, 9],
            //         [22, 180],
            //       ],
            //     },
            //     "circle-color": [
            //       "case",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 53],
            //       "rgb(229, 59, 46)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 47],
            //       "rgb(166, 15, 20)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 41],
            //       "rgb(103, 38, 11)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 35],
            //       "rgb(153, 52, 4)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 29],
            //       "rgb(204, 76, 2)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 17],
            //       "rgb(236, 112, 20)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 11],
            //       "rgb(254, 153, 41)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], 5],
            //       "rgb(254, 196, 79)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], -1],
            //       "rgb(254, 227, 145)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], -5],
            //       "rgb(247, 247, 247)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], -13],
            //       "rgb(209, 229, 240)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], -19],
            //       "rgb(146, 197, 222)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], -32.5],
            //       "rgb(33, 102, 172)",
            //       [">=", ["to-number", ["get", "dewpoint_temperature"]], -55],
            //       "rgb(5, 48, 97)",
            //       "#fff"
            //     ]

            //   }
            // },

            {
              "source-layer": "public.hourly_atm_pressure",
              metadata: {
                position: "top",
              },
              type: "symbol",
              layout: {
                "text-field": "{atm_pressure}",
                "text-font": ["Noto Sans Regular"],
                'text-size': 12,
                "text-allow-overlap": true,
                "text-offset":[2, -1]

                // "icon-text-fit":"both"
              },
              paint:{
                "text-halo-width":0.1,
                "text-halo-blur":0,
                "text-halo-color":"#000",
                "text-color":[
                  "case",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1054],
                  "rgb(47, 7, 8)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1046],
                  "rgb(109, 27, 50)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1038],
                  "rgb(158, 45, 90)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1030],
                  "rgb(212, 134, 72)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1021],
                  "rgb(212, 134, 72)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1030],
                  "rgb(200, 73, 109)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1021],
                  "rgb(212, 134, 72)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1013],
                  "rgb(213, 182, 61)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 1005],
                  "rgb(195, 212, 64)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 997],
                  "rgb(107, 193, 83)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 989],
                  "rgb(80, 173, 131)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 981],
                  "rgb(67, 121, 183)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 973],
                  "rgb(88, 82, 163)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 964],
                  "rgb(40, 29, 102)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 956],
                  "rgb(157, 19, 157)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 948],
                  "rgb(255, 51, 255)",
                  [">=", ["to-number", ["get", "atm_pressure"]], 940],
                  "rgb(115, 114, 114)",
                  "#333"
                ]


              }

            },


          ],

        },
      },
      legendConfig: {
        type: "choropleth",
        items: [
          { name: "", color: "rgb(5, 48, 97)" },
          { name: -32.5, color: "rgb(33, 102, 172)" },
          { name: "", color: "rgb(146, 197, 222)" },
          { name: -13, color: "rgb(209, 229, 240)" },
          { name: "", color: "rgb(247, 247, 247)" },
          { name: -1, color: "rgb(254, 227, 145)" },
          { name: "", color: "rgb(254, 196, 79)" },
          { name: 11, color: "rgb(254, 153, 41)" },
          { name: "", color: "rgb(236, 112, 20)" },
          { name: 29, color: "rgb(204, 76, 2)" },
          { name: "", color: "rgb(153, 52, 4)" },
          { name: 41, color: "rgb(103, 38, 11)" },
          { name: "", color: "rgb(166, 15, 20)" },
          { name: "53 °C", color: "rgb(229, 59, 46)" },
        ],
      },
      params: {
        time: `2022-11-24T18:00:00Z`,
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
      interactionConfig: {
        output: [
          { column: "name", property: "Name" },
          { column: "atm_pressure", property: "Atmospheric Pressure",
          units:"Hpa"},
          { column: "message", property: "Message", },
        ],
      },
    },
  ]
}


