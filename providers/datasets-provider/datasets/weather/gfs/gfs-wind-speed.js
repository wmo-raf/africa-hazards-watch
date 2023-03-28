import { GFS_WIND_SPEED } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Wind Forecast";
const layerName = GFS_WIND_SPEED;
const metadataId = "73c163c2-606c-4f27-85dc-4762268c8b9f";
const timestampsDataPath = "/gskydata/gfs/gfs-wind-speed-10-m";

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
          items: [
            { name: "0", color: "rgb(0, 0, 168)" },
            {
              name: 10.0,
              color: "#1d7e6e",
            },
            {
              name: 20.0,
              color: "#2aa600",
            },
            {
              name: 30.0,
              color: "#915500",
            },
            {
              name: 40.0,
              color: "#9e043a",
            },
            {
              name: 50.0,
              color: "#7b117b",
            },
            {
              name: 60.0,
              color: "#842e84",
            },
            {
              name: 70.0,
              color: "#8d4d8d",
            },
            {
              name: 80.0,
              color: "#966c96",
            },
            {
              name: 90.0,
              color: "#a08aa0",
            },
          ],
        },
        params: {
          time: "",
          geojson_feature_id: "",
          height: "gfs_wind_speed_10_m",
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
              { label: "Surface", value: "gfs_wind_speed_10_m" },
              { label: "Cloud - 500 mb", value: "gfs_wind_speed_200_mb" },
              { label: "Cruise - 200 mb", value: "gfs_wind_speed_500_mb" },
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
    layer: GFS_WIND_SPEED,
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
