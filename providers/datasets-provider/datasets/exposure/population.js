export default [
  {
    id: "world_pop_100_2020",
    dataset: "world_pop_100_2020",
    name: "Population 2020 - Grid, 100m",
    layer: "world_pop_100_2020",
    category: 7,
    sub_category: 7,
    metadata: "a928f7d5-bfe0-4570-9987-d3475d42bfbd",
    citation: "WorldPop constrained, 2020",
    layers: [
      {
        name: "Population 2020 - Grid, 100m ",
        id: "world_pop_100_2020",
        type: "layer",
        default: true,
        dataset: "world_pop_100_2020",
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "http://localhost/ows/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time=2020-01-01T00:00:00.000Z&layers=population",
            ],
          },
        },
        legendConfig: {
          items: [
            {
              name: "0",
              color: "#ffffe4",
            },
            {
              name: "",
              color: "#fbe577",
            },
            {
              name: "6",
              color: "#fcc760",
            },
            {
              name: "",
              color: "#fcb837",
            },
            {
              name: "14",
              color: "#f57c1f",
            },
            {
              name: "18",
              color: "#ef5c24",
            },
            {
              name: "",
              color: "#f83011",
            },
            {
              name: "22",
              color: "#ca192b",
            },
            {
              name: "",
              color: "#b20a49",
            },
            {
              name: "30",
              color: "#960554",
            },
            {
              name: "",
              color: "#930765",
            },
            {
              name: "38",
              color: "#6f0774",
            },
            {
              name: "50",
              color: "#690669",
            },
          ],
          type: "gradient",
        },
      },
    ],
  },
];
