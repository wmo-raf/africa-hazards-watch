import { GFS_WIND_SPEED } from "data/layers";

const datasetName = "Wind Forecast";
const layerName = GFS_WIND_SPEED;
const metadataId = "73c163c2-606c-4f27-85dc-4762268c8b9f";
const timestampsDataPath = "/gskydata/gfs/gfs-wind-speed-10-m";

const category = 1;
const subCategory = 1;

export default [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
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
              `http://20.56.94.119/gsky/ows/gfs?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers={height}&clip_feature={clip_feature}`,
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
