import { ECMWF_WINDSPEED_FORECAST } from "data/layers";
import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Wind Speed";
const layerName = ECMWF_WINDSPEED_FORECAST;
const metadataId = "";
const timestampsDataPath = "/gskydata/ecmwf-forecast/oper_fc_wind_speed_sfc";
const owsNameSpace = "ecmwf-opendata";

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
    citation: "ECMWF IFS, 3-Hourly for the next 6 days, 0.4° grid spacing",
    group: "ecmwf",
    global: true,
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
              `http://20.56.94.119/gsky/ows/${owsNameSpace}?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers={pLevel}&geojson_feature_id={geojson_feature_id}`,
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
          pLevel: "oper_fc_wind_speed_sfc",
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
            key: "pLevel",
            required: true,
            type: "radio",
            options: [
              { label: "Surface 2M", value: "oper_fc_wind_speed_sfc" },
              { label: "1000 hPa", value: "oper_fc_wind_speed_pl_1000" },
              { label: "925 hPa", value: "oper_fc_wind_speed_pl_925" },
              { label: "850 hPA", value: "oper_fc_wind_speed_pl_850" },
              { label: "700 hPA", value: "oper_fc_wind_speed_pl_700" },
              { label: "500 hPA", value: "oper_fc_wind_speed_pl_500" },
              { label: "300 hPA", value: "oper_fc_wind_speed_pl_300" },
              { label: "250 hPA", value: "oper_fc_wind_speed_pl_250" },
              { label: "200 hPA", value: "oper_fc_wind_speed_pl_200" },
              { label: "50 hPA", value: "oper_fc_wind_speed_pl_50" },
            ],
            sentence: "Pressure Level {selector}",
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
    layer: ECMWF_WINDSPEED_FORECAST,
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
