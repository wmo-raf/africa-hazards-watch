import { ECMWF_PRECIPITATION_FORECAST } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Precipitation Forecast ";
const layerName = "ecmwf_highres_precipitation";
const metadataId = "";

const layerId = "tp_interval";

const category = "weather";
const subCategory = "weather-forecast";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "ECMWF HRES",
    group: "ecmwf-hres",
    global: true,
    capabilities: ["clip", "timeseries"],
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        citation: "",
        default: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `https://eccharts-test.ecmwf.int/wms?service=WMS&request=GetMap&version=1.3.0&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerId}&token=530604a2ed5d28f759c02185beb2ca12`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          items: [
            { name: "", color: "#4f57b7" },
            { name: 0.2, color: "#554eb1" },
            { name: "", color: "#4369c4" },
            { name: 1, color: "#40a0b4" },
            { name: "", color: "#4ec262" },
            { name: 4, color: "#95db46" },
            { name: "", color: "#dcea37" },
            { name: 8, color: "#ebc038" },
            { name: "", color: "#eaa43e" },
            { name: 15, color: "#e97b48" },
            { name: "", color: "#e1545d" },
            { name: 30, color: "#be3066" },
            { name: "40 mm", color: "#93174e" },
          ],
        },
        params: {
          time: "2023-08-15T00:00:00.000Z",
          geojson_feature_id: "",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
            availableDates: ["2023-08-15T00:00:00.000Z"],
          },
        ],
        timeParamSentenceConfig: {
          param: "time",
          format: "do MMM y hh:mm",
          add: 7,
          template: "Selected Period : {time}",
        },
      },
    ],
  },
];

const updates = [];

export default { datasets, updates };
