import { fetchTimestamps } from "services/timestamps";
import { parseISO, format, addDays, startOfHour } from "date-fns";

const datasetName = "Temperature Forecast - near surface ";
const layerName = "gfs_temperature_2m";
const metadataId = "73c163c2-606c-4f27-85dc-4762268c8b9f";
const dataPath = "/gskydata/tera/gfs-temperature-2-m";

const category = 1;
const subCategory = 1;

const generateLayers = (timestamps = []) => {
  // get current hour
  const currentHour = startOfHour(new Date());
  const latest = currentHour.toISOString();

  const time = parseISO(latest);
  const end = addDays(time, 7);
  const dateFormat = "do MMM y hh:mm";

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
            `http://localhost/ows/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&clip_feature={clip_feature}`,
          ],
          minzoom: 3,
          maxzoom: 12,
        },
        canClipToGeom: true,
      },
      legendConfig: {
        type: "gradient",
        items: [
          { name: -20, color: "#9589D3" },
          { name: "", color: "#96d1d8" },
          { name: "-10", color: "#81ccc5" },
          { name: "", color: "#67b4ba" },
          { name: "0", color: "#5f8fc5" },
          { name: "", color: "#508c3e" },
          { name: "10", color: "#79921c" },
          { name: "", color: "#aba10e" },
          { name: "20", color: "#dfb106" },
          { name: "", color: "#f39606" },
          { name: "30", color: "#ec5f15" },
          { name: "", color: "#be4112" },
          { name: "40 °C", color: "#8A2B0A" },
        ],
      },
      params: {
        time: `${latest}`,
        clip_feature: "",
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
          key: "temperature_forecast",
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
