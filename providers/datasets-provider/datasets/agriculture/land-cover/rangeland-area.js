const category = "agriculture";
const subCategory = "agric-land-cover";

const datasetName = "Rangeland Area";
const layerId = "rangeland-area";
const layerName = "asap5:mask_pasture";

const datasets = [
  {
    name: datasetName,
    id: layerId,
    dataset: layerId,
    type: "dataset",
    published: true,
    active: true,
    status: "saved",
    layer: layerId,
    category: category,
    sub_category: subCategory,
    metadata: "",
    layers: [
      {
        id: layerId,
        dataset: layerId,
        name: datasetName,
        layerConfig: {
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              `https://agriculturehotspots.icpac.net/asap/wms?LAYERS=${layerName}&FORMAT=image/png&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&TILED=true&CRS=EPSG:3857&gridSet=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=512&HEIGHT=512&FORMAT_OPTIONS=dpi:60`,
            ],

            type: "raster",
          },
          type: "raster",
        },
        legendConfig: {
          items: [
            {
              color: "#ffffc9",
              name: "0 - 20%",
            },
            {
              color: "#c9dea9",
              name: "20 - 40%",
            },
            {
              color: "#98c38d",
              name: "40 - 60%",
            },
            {
              color: "#64a46e",
              name: "60 - 80%",
            },
            {
              color: "#308650",
              name: "80 - 100%",
            },
          ],
          type: "basic",
        },
      },
    ],
  },
];

const updates = [];

export default { datasets, updates };
