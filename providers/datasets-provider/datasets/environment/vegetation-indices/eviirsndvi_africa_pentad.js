import { getTimeValuesFromWMS } from "services/wms";

const datasetName = "NDVI eVIIRS Data";
const layerName = "eviirsndvi_africa_pentad_data";
const metadataId = "";

const category = "environment";
const subCategory = "vegetation-indices";

const wmsBaseUrl =
  "https://dmsdata.cr.usgs.gov/geoserver/fews_eviirsndvi_africa_pentad_data/eviirsndvi_africa_pentad_data/wms";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "eVIIRS, Pentadal, updated every 5 days",
    global: true,
    capabilities: ["timeseries"],
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        default: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `https://dmsdata.cr.usgs.gov/geoserver/fews_eviirsndvi_africa_pentad_data/eviirsndvi_africa_pentad_data/wms?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
        },
        legendConfig: {
          type: "gradient",
          items: [
            { name: "0", color: "#cab490" },
            { name: "0.1", color: "#c6b07e" },
            { name: "0.2", color: "#ddd4a6" },
            { name: "0.3", color: "#dbe5b0" },
            { name: "0.4", color: "#b4d98d" },
            { name: "0.5", color: "#8ccd6b" },
            { name: "0.6", color: "#65ac41" },
            { name: "0.7", color: "#3f8819" },
            { name: "0.8", color: "#276e00" },
            { name: "0.9", color: "#256100" },
            { name: "1", color: "#275300" },
          ],
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
            dateFormat: { currentTime: "mmm yyyy", asPeriod: "pentadal" },
            availableDates: [],
          },
        ],
      },
    ],
  },
];

const updates = [
  {
    layer: layerName,
    getTimestamps: (params = {}, token) => {
      return getTimeValuesFromWMS(wmsBaseUrl, layerName).then((timestamps) => {
        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      return timestamps[timestamps.length - 1];
    },
  },
];

export default { datasets, updates };
