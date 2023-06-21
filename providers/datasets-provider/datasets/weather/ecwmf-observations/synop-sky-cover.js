const datasetName = "Sky Cover (okta)";
const layerName = "3_hour_sky_cover";

export const skyCoverage = (timestamps = []) => {
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
              filter: ["has", "cloud_amount"],
              layout: {
                "icon-image": ["concat", "okta-", ["get", "cloud_amount"]],
                "icon-size": {
                  base: 4,
                  stops: [
                    [2, 0.1],
                    [22, 120],
                  ],
                },
                "icon-allow-overlap": true,
                "icon-offset": [0, 1],
              },
            },
          ],
        },
      },
      legendConfig: {
        type: "basic",
        items: [
          // {
          //   icon: "/assets/layer-icons/cloudcover.png",
          // },
        ],
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
      // interactionConfig: {
      //   output: [
      //     { column: "name", property: "Name" },
      //     { column: "sky_coverage", property: "Sky Coverage", units: "okta" },
      //     { column: "message", property: "Message", },
      //   ],
      // },
    },
  ];
};
