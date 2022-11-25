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
export default [
  {
    name: "Wind Speed & Direction",
    id: "3_hour_wind",
    dataset: "3_hour_wind",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "3_hour_wind",
    citation: "GTS Synop, 3 Hourly",
    category: 1,
    sub_category: 4,
    metadata: "ecf74a56-2106-441e-8932-44b68a57c197",
    layers: [
      {
        id: "3_hour_wind",
        dataset: "3_hour_wind",
        name: "3 Hour Wind Speed & Direction",
        type: "layer",
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
          time: "2022-10-03 03:00",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: ["2022-10-03 03:00", "2022-10-03 06:00"],
          },
        ],
        interactionConfig: {
          output: [
            { column: "name", property: "Name" },
            { column: "wind_speed", property: "Speed (knots)" },
            { column: "wind_direction", property: "Direction (°)" },
          ],
        },
      },
    ],
  },
];
