import { GFS_PRECIPITABLE_WATER_TOTAL } from "data/layers";

const datasetName = "Water in Atmosphere";
const layerName = GFS_PRECIPITABLE_WATER_TOTAL;
const metadataId = "73c163c2-606c-4f27-85dc-4762268c8b9f";
const timestampsDataPath = "/gskydata/gfs/gfs-precipitable-water-total";

const category = 1;
const subCategory = 1;

// const generateLayers = (timestamps = []) => {
//   // get current hour
//   const currentHour = startOfHour(new Date());
//   const latest = currentHour.toISOString();

//   const time = parseISO(latest);
//   const end = addDays(time, 7);
//   const dateFormat = "do MMM y hh:mm";

//   const periodStr = `Latest: ${format(time, dateFormat)} to ${format(
//     end,
//     dateFormat
//   )}`;

//   return;
// };

export default [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "GFS, Hourly for the next 5 days",
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
              `http://197.254.13.228:8081/ows/gfs?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&clip_feature={clip_feature}`,
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
          clip_feature: "",
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
        hidePastTimestamps: true, // we might need to hide past forecast
        data_path: timestampsDataPath,
      },
    ],
  },
];
