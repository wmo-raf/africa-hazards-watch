import { DUST_SURFACE_CONCENTRATION_FORECAST } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Dust Surface Concentration Forecast (µg/m³)";
const layerName = DUST_SURFACE_CONCENTRATION_FORECAST;
const metadataId = "";
const timestampsDataPath = "/gskydata/dust-forecast/sconc_dust";

const layerId = "sconc_dust";
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
    global: false,
    region: "north_africa",
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
            {
              name: 20,
              color: "#a1ede3",
            },
            {
              name: 50,
              color: "#5be3ba",
            },
            {
              name: 200,
              color: "#fcd775",
            },
            {
              name: 500,
              color: "#da7230",
            },
            {
              name: 2000,
              color: "#9f6225",
            },
            {
              name: "5000 µg/m³",
              color: "#714921",
            },
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
    layer: DUST_SURFACE_CONCENTRATION_FORECAST,
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
