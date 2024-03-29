import { GFS_RELATIVE_HUMIDITY } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Relative Humidity";
const layerName = GFS_RELATIVE_HUMIDITY;
const metadataId = "acde4034-a6bf-4f90-a3b8-2b50e553c6fc";
const timestampsDataPath = "/gskydata/gfs/gfs-relative-humidity-2-m";

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
    citation: "GFS, Hourly for the next 5 days",
    group: "gfs",
    global: true,
    capabilities: ["clip", "timeseries", "analysis"],
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
              `http://20.56.94.119/gsky/ows/gfs?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers={height}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "gradient",
          items: [],
        },
        params: {
          time: "",
          geojson_feature_id: "",
          height: "gfs_relative_humidity_2_m",
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
          {
            key: "height",
            required: true,
            type: "radio",
            options: [
              { label: "Surface", value: "gfs_relative_humidity_2_m" },
              {
                label: "Cloud - 500 mb",
                value: "gfs_relative_humidity_500_mb",
              },
              {
                label: "Cruise - 200 mb",
                value: "gfs_relative_humidity_200_mb",
              },
            ],
            sentence: "Height {selector}",
          },
        ],
        timeParamSentenceConfig: {
          param: "time",
          format: "do MMM y hh:mm",
          add: 7,
          template: "Selected Period : {time}",
        },
        hidePastTimestamps: true, // we might need to hide past forecast
        data_path: timestampsDataPath,
        analysisConfig: [],
      },
    ],
  },
];

const updates = [
  {
    layer: GFS_RELATIVE_HUMIDITY,
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
    updateInterval: 300000, // 5 minutes
  },
];

export default { datasets, updates };
