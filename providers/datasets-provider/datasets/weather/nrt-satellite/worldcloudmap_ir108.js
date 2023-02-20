const category = 1;
const subCategory = 2;

const layerId = "mumi:worldcloudmap_ir108";
const name = "Infrared Cloud Imagery";

export default [
  {
    id: layerId,
    dataset: layerId,
    name: name,
    layer: layerId,
    category: category,
    sub_category: subCategory,
    metadata: "",
    isNearRealTime: true,
    citation: "EUMETSAT, Updated every 3 Hours",
    layers: [
      {
        name: name,
        id: layerId,
        type: "layer",
        default: true,
        dataset: layerId,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://20.56.94.119/sat-imagery/metsat/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png8&TRANSPARENT=true&LAYERS=${layerId}&time={time}&STYLES=&tiled=true&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&BBOX={bbox-epsg-3857}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
        },
        params: {
          time: "",
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: [],
          },
        ],
        legendConfig: {},
      },
    ],
  },
];