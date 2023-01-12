import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";
import { PG_WEATHER_FEATURESERV_URL } from "utils/apis";

const datasetName = "Cloud Type";
const layerName = "3_hour_cloud_type";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/cloud_type";

const fmtClouds = (val) => {
  if(val == '1'){
    return 'cumulus'
  }

  return 'dont know'
}

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
              `${PG_WEATHER_FEATURESERV_URL}/public.hourly_cloud_type/{z}/{x}/{y}.pbf?selected_date={time}`,
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
                  'icon-image': ["concat", "cloud-",["get", "cloud_type"] ],
                  'icon-size':
                  {
                    base: 4,
                    stops: [
                      [2, 0.1],
                      [22, 120],
                    ],
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
          time: `${latest}`
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
          intersect: true,
          output: [
            { column: "name", property: "Name" },
            { column: "cloud_type", property: "Cloud Type", intersection: true},
          { column: "message", property: "Message", },
          ],
        },
        intersectionMap:{
          0:'Cirrus',
          1:'Cirrocumulus',
          2:'Cirrostratus',
          3:'Altocumulus',
          4:'Altostratus',
          5:'Nimbostratus',
          6:'Stratocumulus',
          7:'Stratus',
          8:'Cumulus',
          9:'Cumulonimbus',
          10:'Cloud not visible owing to darkness, fog, duststorm, sandstorm, or other analogous phenonomena/sky obcured'
        }
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

