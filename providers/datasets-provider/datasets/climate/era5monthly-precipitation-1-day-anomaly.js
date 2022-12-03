import { fetchTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "Monthly Total Precipitation Anomaly";
const layerName = "era5monthly_precipitation_1_day_anomaly";
const metadataId = "0cf9e8d5-42eb-426c-811b-e89661eb2ff3";
const dataPath = "/gskydata/era5/era5monthly-precipitation-1-day-anomaly";

const category = 2;
const subCategory = 2;

const generateLayers = (timestamps = []) => {
  const latest = timestamps[timestamps.length - 1];

  if (!latest) {
    return [];
  }

  const time = parseISO(latest);
  const end = addDays(time, 7);
  const dateFormat = "mmm, yyyy";

  const periodStr = `Latest: ${format(time, dateFormat)} to ${format(
    end,
    dateFormat
  )}`;

  return [
    {
      name: datasetName,
      id: layerName,
      type: "layer",
      citation: periodStr,
      default: true,
      dataset: layerName,
      layerConfig: {
        type: "raster",
        source: {
          type: "raster",
          tiles: [
            `http://197.254.13.228:8081/ows/era5?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}`,
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
        time: `${latest}`,
        clip_wkt: "",
      },
      paramsSelectorConfig: [
        {
          key: "time",
          required: true,
          sentence: "{selector}",
          type: "datetime",
          dateFormat: { currentTime: "mmmm, yyyy" },
          availableDates: timestamps,
        },
      ],
      timeParamSentenceConfig: {
        param: "time",
        format: "mmm, yyyy",
        add: 7,
        template: "Selected Period : {time}",
      },
      hidePastTimestamps: true, // we might need to hide past forecast
      data_path: dataPath,
      analysisConfig: [
        {
          key: "era5_precipitation_anomaly",
          type: "admin",
        },
      ],
    },
  ];
};

export default [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "ERA5 reanalysis, Reference 1991 - 2020",
    getLayers: async () => {
      return await fetchTimestamps(dataPath)
        .then((res) => {
          const timestamps = (res.data && res.data.timestamps) || [];
          return generateLayers(timestamps);
        })
        .catch((err) => {
          return generateLayers([]);
        });
    },
  },
];
