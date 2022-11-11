const date = "2020-01-01T00:00:00.000Z";

const layerName = "esa_world_cover";

export default [
  {
    id: layerName,
    dataset: layerName,
    name: "Esa World Cover",
    layer: layerName,
    category: 6,
    sub_category: 1,
    metadata: "",
    citation: "ESA World Cover, 10M",
    layers: [
      {
        name: "ESA World Cover",
        id: layerName,
        type: "layer",
        default: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://197.254.13.228:8081/ows/environment?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}`,
            ],
          },
        },
        params: {
          time: date,
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            type: "radio",
            sentence: "Year {selector}",
            options: [{ label: "2020", value: date }],
          },
        ],
        legendConfig: {
          type: "basic",
          items: [
            {
              name: "Shrubland",
              color: "#ffbb22",
            },
            {
              name: "Grassland",
              color: "#ffff4c",
            },
            {
              name: "Cropland",
              color: "#f096ff",
            },
            {
              name: "Built up",
              color: "#fa0000",
            },
            {
              name: "Bare / Sparse Vegetation",
              color: "#b4b4b4",
            },
            {
              name: "Snow & Ice",
              color: "#f0f0f0",
            },
            {
              name: "Permanent Water Bodies",
              color: "#0064c8",
            },
            {
              name: "Herbaceous Wetland",
              color: "#0096a0",
            },
            {
              name: "Mangroves",
              color: "#00cf75",
            },
            { name: "Moss and lichen", color: "#fae6a0" },
          ],
        },
        moreInfo: {
          linkText: "More details",
          linkUrl: "https://esa-worldcover.org/en",
          text:
            "Baseline global land cover at 10m resolution based on Sentinel-1 and 2 data",
        },
      },
    ],
  },
];
