import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Wind Speed & Direction";
const layerName = "3_hour_wind";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/wind_speed";

const barbCutoffs = [0, 3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 68, 73, 78, 83, 87, 93, 97, 103, 107]

const layers = []

// eslint-disable-next-line no-plusplus
for (let b = 0; b < barbCutoffs.length - 1; b++) {
  layers.push({
    'type': 'symbol',
    'filter': [
      'all',
      ['>=', 'wind_speed', barbCutoffs[b]],
      ['<', 'wind_speed', barbCutoffs[b + 1]],
      // ['==', 'UTC time', '21Z'],
    ],
    "source-layer": "public.hourly_wind",
    metadata: {
      position: "top",
    },
    'paint': {
      // 'icon-opacity': 0.8 + b * 0.008,
      // 'icon-color': 'red'

    },
    'layout': {
      'icon-image': `barbs-${(b + 1) < 11 ? `0${b + 1}` : (b + 1)}`,
      'icon-size':
      {
        // 'base': 1,
        // 'stops': [[2, 0.35], [6, 0.7]]
        base: 4,
        stops: [
          [2, 0.4],
          [22, 120],
        ],
      },
      'icon-allow-overlap': true,
      'icon-rotation-alignment': 'map',
      'icon-rotate': {
        'property': 'wind_direction',
        'stops': [[0, 90], [360, 450]]
      }
    }
  })
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
            "http://localhost:7800/public.hourly_wind/{z}/{x}/{y}.pbf?selected_date={time}",
          ],
          type: "vector",
        },
        render: {
          layers
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
          availableDates: timestamps
        },
      ],

      timeParamSentenceConfig: {
        param: "time",
        format: "mmm, yyyy",
        add: 1,
        template: "Selected Period : {time}",
      },
      data_path: dataPath,

      interactionConfig: {
        output: [
          { column: "name", property: "Name" },
          { column: "wind_speed", property: "Speed (knots)" },
          { column: "wind_direction", property: "Direction (°)" },
        ],
      },
    }
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
