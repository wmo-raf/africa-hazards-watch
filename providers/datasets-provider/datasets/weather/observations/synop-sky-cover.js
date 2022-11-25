
export default [
  {
    name: "Sky Cover (okta)",
    id: "3_hour_sky_cover",
    dataset: "3_hour_sky_cover",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "3_hour_sky_cover",
    citation: "GTS Synop, 3 Hourly",
    category: 1,
    sub_category: 4,
    metadata: "ecf74a56-2106-441e-8932-44b68a57c197",
    layers: [
      {
        id: "3_hour_sky_cover",
        dataset: "3_hour_sky_cover",
        name: "3 Hour Sky Cover",
        type: "layer",
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
                  'icon-image': ['get', 'sky_coverage'],
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
            { column: "sky_coverage", property: "Sky Coverage (okta)" },
          ],
        },
      },
    ],
  },
];
