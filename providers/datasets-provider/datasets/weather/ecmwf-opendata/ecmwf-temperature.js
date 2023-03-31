import { ECMWF_TEMPERATURE_FORECAST } from "data/layers";

import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

const datasetName = "Temperature Forecast ";
const layerName = ECMWF_TEMPERATURE_FORECAST;
const metadataId = "";
const timestampsDataPath = "/gskydata/ecmwf-forecast/oper_fc_temperature_sfc";
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
          time: "",
          geojson_feature_id: "",
          pLevel: "oper_fc_temperature_sfc",
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
              { label: "Surface 2M", value: "oper_fc_temperature_sfc" },
              { label: "1000 hPa", value: "oper_fc_temperature_pl_1000" },
              { label: "925 hPa", value: "oper_fc_temperature_pl_925" },
              { label: "850 hPA", value: "oper_fc_temperature_pl_850" },
              { label: "700 hPA", value: "oper_fc_temperature_pl_700" },
              { label: "500 hPA", value: "oper_fc_temperature_pl_500" },
              { label: "300 hPA", value: "oper_fc_temperature_pl_300" },
              { label: "250 hPA", value: "oper_fc_temperature_pl_250" },
              { label: "200 hPA", value: "oper_fc_temperature_pl_200" },
              { label: "50 hPA", value: "oper_fc_temperature_pl_50" },
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
    layer: ECMWF_TEMPERATURE_FORECAST,
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
