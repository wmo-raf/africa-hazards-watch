import qs from "query-string";
import { fetchEcwmfHresTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";
import { ECMWF_HRES_TOKEN } from "utils/constants";

const category = "weather";
const subCategory = "weather-forecast";

const datasetName = "Temperature";
const layerName = "ecmwf_highres_temperature";
const metadataId = "57d60cdf-6aa3-4141-9c9e-18ec6f6ba122";

const baseWMSUrl = "https://eccharts-test.ecmwf.int/wms/";
const wmsLayer = "2t";
const style = "sh_all_fM48t56i4";

const wmsParams = {
  service: "WMS",
  request: "GetMap",
  version: "1.3.0",
  transparent: true,
  srs: "EPSG:3857",
  bbox: "{bbox-epsg-3857}",
  format: "image/png",
  width: 552,
  height: 552,
  styles: style,
  layers: wmsLayer,
  expver: "0001",
  preseed: "1",
  token: ECMWF_HRES_TOKEN,
};
const wmsParamsString = qs.stringify(wmsParams, { encode: false });
const wmsUrl = `${baseWMSUrl}?${wmsParamsString}&time={time}`;

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "ECMWF HRES",
    group: "ecmwf-hres",
    global: true,
    capabilities: [],
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
            tiles: [wmsUrl],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        legendConfig: {
          type: "choropleth",
          items: [],
        },
        params: {
          time: "",
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
          template: "Selected Time : {time}",
        },
      },
    ],
  },
];

const updates = [
  {
    layer: layerName,
    getTimestamps: (params = {}, token) => {
      return fetchEcwmfHresTimestamps(wmsLayer).then((res) => {
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
