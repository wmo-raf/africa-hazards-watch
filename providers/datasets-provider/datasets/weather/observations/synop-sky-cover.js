import { parseISO, format, addDays } from "date-fns";

const datasetName = "Sky Cover (okta)";
const layerName = "3_hour_sky_cover";

export const skyCoverage = (timestamps = []) => {
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
              "http://localhost:7800/public.hourly_sky_cover/{z}/{x}/{y}.pbf?selected_date={time}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                'type': 'symbol',

                "source-layer": "default",
                metadata: {
                  position: "top",
                },
                'layout': {
                  'icon-image': ["concat", "okta-", ["get", "sky_coverage"]],
                  'icon-size':
                  {
                    base: 4,
                    stops: [
                      [2, 0.1],
                      [22, 120],
                    ],
                  },
                  'icon-allow-overlap': true,
                  'icon-offset':[0, 1]
                }

              }
            ]
          },
        },
        legendConfig: {
          type: "",
          items: []
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
            { column: "sky_coverage", property: "Sky Coverage",units:"okta"},
            { column: "message", property: "Message", },
          ],
        },
      },
    ]
  }
