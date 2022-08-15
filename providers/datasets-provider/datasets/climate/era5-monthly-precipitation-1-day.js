import { fetchTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";

const datasetName = "ERA5 Monthly Average Precipitation per day";
const layerName = "total_precipitation";
const metadataId = "0cf9e8d5-42eb-426c-811b-e89661eb2ff3";
const dataPath = "/gskydata/tera/era5monthly-precipitation-1-day";

const category = 2;
const subCategory = 1;

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
          { name: 0, color: "#52478d" },
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
          { name: "", color: "#e15e5d" },
          { name: 30, color: "#be3066" },
          { name: "", color: "#93174e" },
          { name: "50 mm", color: "#541029" },
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
    citation: "ERA5 reanalysis, monthly means",
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
