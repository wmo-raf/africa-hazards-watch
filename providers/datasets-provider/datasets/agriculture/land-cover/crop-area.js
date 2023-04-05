const category = "agriculture";
const subCategory = "agric-land-cover";

const datasetName = "Crop Area";
const layerId = "asap_africa_mask_crop_v03";
const owsNameSpace = "agriculture";

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
              `http://20.56.94.119/gsky/ows/${owsNameSpace}?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerId}&geojson_feature_id={geojson_feature_id}`,
            ],

            type: "raster",
          },
          type: "raster",
          canClipToGeom: true,
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
        params: {
          time: "2019-01-01T00:00:00.000Z",
          geojson_feature_id: "",
        },
      },
    ],
  },
];

const updates = [{ layer: layerId }];

export default { datasets, updates };
