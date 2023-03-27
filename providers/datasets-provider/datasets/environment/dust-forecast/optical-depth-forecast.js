import { DUST_OPTICAL_DEPTH_FORECAST } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Dust Optical Depth Forecast (550nm)";
const layerName = DUST_OPTICAL_DEPTH_FORECAST;
const metadataId = "";
const timestampsDataPath = "/gskydata/dust-forecast/od550_dust";

const layerId = "od550_dust";
const owsNameSpace = "dust-forecast";

const category = "environment";
const subCategory = "dust_forecast";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "Multi-Model, North Africa",
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
              `http://20.56.94.119/gsky/ows/${owsNameSpace}?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerId}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "choropleth",
          items: [
            { name: 0.2, color: "#A1EDE3" },
            { name: 0.4, color: "#5CE3BA" },
            { name: 0.8, color: "#FCD775" },
            { name: 1.2, color: "#DA7230" },
            { name: 1.6, color: "#9E6226" },
            { name: 3.2, color: "#714921" },
            { name: 6.4, color: "#392511" },
            { name: "", color: "#1D1309" },
          ],
        },
        params: {
          time: "",
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
            availableDates: [],
          },
        ],
        timeParamSentenceConfig: {
          param: "time",
          format: "do MMM y hh:mm",
          add: 7,
          template: "Selected Period : {time}",
        },
        data_path: timestampsDataPath,
      },
    ],
  },
];

const updates = [
  {
    layer: DUST_OPTICAL_DEPTH_FORECAST,
    getTimestamps: (params = {}, token) => {
      return fetchTimestamps(timestampsDataPath).then((res) => {
        const timestamps = (res.data && res.data.timestamps) || [];

        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      const nextDate = getNextDate(timestamps);

      if (nextDate) {
        return nextDate;
      }

      return timestamps[timestamps.length - 1];
    },
    updateInterval: 900000, // 15 minutes
  },
];

export default { datasets, updates };
