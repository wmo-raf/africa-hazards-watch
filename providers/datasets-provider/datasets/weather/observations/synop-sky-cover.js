import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Sky Cover (okta)";
const layerName = "3_hour_sky_cover";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/sky_coverage";

const generateLayers = (timestamps = []) => {
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
      dataset: layerName,
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
                  'icon-image': ["concat", "okta-", ["get", "sky_cover"]],
                  'icon-size':
                  {
                    'base': 1,
                    'stops': [[2, 0.35], [6, 0.7]]
                  },
                  'icon-allow-overlap': true,
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
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "sky_coverage", property: "Sky Coverage (okta)" },
          ],
        },
      },
    ]
  }

  export default [
    {
      name: datasetName,
      id: layerName,
      dataset: layerName,
      layer: layerName,
      category,
      sub_category: subCategory,
      metadata: metadataId,
      citation: "GTS Synop, 3 Hourly",
      getLayers: async () => {
        return await fetchSynopTimestamps(dataPath)
          .then((res) => {
            const timestamps = (res.data && res.data.timestamps) || [];

            return generateLayers(timestamps);

          })
          .catch(() => {
            return generateLayers([]);
          });
      },
    },
  ];
