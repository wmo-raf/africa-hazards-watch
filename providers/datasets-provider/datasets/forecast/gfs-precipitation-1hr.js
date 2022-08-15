import { fetchTimestamps } from "services/timestamps";
import { parseISO, format, addDays, startOfHour } from "date-fns";

const datasetName = "Precipitation Forecast";
const layerName = "gfs_precipitation_1hr";
const metadataId = "4ba0fb8c-3e9e-42ea-8956-f961dc80f71f";
const dataPath = "/gskydata/tera/gfs-precipitation-1-hr";

const category = 1;
const subCategory = 1;

const generateLayers = (timestamps = []) => {
  // get current hour
  const currentHour = startOfHour(new Date());
  const latest = currentHour.toISOString();

  const time = parseISO(latest);
  const end = addDays(time, 7);
  const dateFormat = "do MMM y hh:mmm";

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
            `http://localhost/ows/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&clip_wkt={clip_wkt}`,
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
        time: `${latest}`,
        clip_wkt: "",
      },
      paramsSelectorConfig: [
        {
          key: "time",
          required: true,
          sentence: "{selector}",
          type: "datetime",
          dateFormat: { currentTime: "yyyy-mm-dd HH:MM" },
          availableDates: timestamps,
        },
      ],
      timeParamSentenceConfig: {
        param: "time",
        format: "do MMM y hh:mm",
        add: 7,
        template: "Selected Period : {time}",
      },
      hidePastTimestamps: true, // we might need to hide past forecast
      data_path: dataPath,
      analysisConfig: [
        {
          key: "forecast_sample",
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
    citation: "Hourly Forecast, GFS",
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
