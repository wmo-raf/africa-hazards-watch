import { ECMWF_WIND_DIVERGENCE } from "data/layers";

const datasetName = "Wind Divergence";
const layerName = ECMWF_WIND_DIVERGENCE;
const metadataId = "";
const timestampsDataPath =
  "/gskydata/ecmwf-forecast/oper_fc_divergence_pl_1000";
const owsNameSpace = "ecmwf-opendata";

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
    citation: "ECMWF IFS, 3-Hourly for the next 6 days, 0.4° grid spacing",
    model: "ecmwf",
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
          type: "choropleth",
          items: [
            {
              name: -100,
              color: "#00004c",
            },
            {
              color: "#00007f",
            },
            {
              color: "#0000b2",
            },
            {
              color: "#0000e5",
            },
            {
              name: -20,
              color: "#0026ff",
            },
            {
              color: "#004cff",
            },
            {
              color: "#0072ff",
            },
            {
              color: "#0099ff",
            },
            {
              name: -9,
              color: "#03bfff",
            },
            {
              color: "#00d8fe",
            },
            {
              color: "#32f2ff",
            },
            {
              color: "#71ffff",
            },
            {
              color: "#bfffff",
            },
            { name: 1, color: "#ffffff" },
            {
              color: "#ffff00",
            },
            {
              color: "#ffe501",
            },
            {
              color: "#ffcc02",
            },
            {
              color: "#ffb202",
            },
            {
              color: "#ff9900",
            },
            {
              color: "#ff7f00",
            },
            {
              name: 15,
              color: "#ff6600",
            },
            {
              color: "#ff4b00",
            },
            {
              color: "#ff2500",
            },
            {
              name: 50,
              color: "#e50101",
            },
            {
              color: "#b20000",
            },
            {
              name: 100,
              color: "#7f0000",
            },
          ],
        },
        params: {
          time: "",
          geojson_feature_id: "",
          pLevel: "oper_fc_divergence_pl_1000",
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
              { label: "1000 hPa", value: "oper_fc_divergence_pl_1000" },
              { label: "925 hPa", value: "oper_fc_divergence_pl_925" },
              { label: "850 hPA", value: "oper_fc_divergence_pl_850" },
              { label: "700 hPA", value: "oper_fc_divergence_pl_700" },
              { label: "500 hPA", value: "oper_fc_divergence_pl_500" },
              { label: "300 hPA", value: "oper_fc_divergence_pl_300" },
              { label: "250 hPA", value: "oper_fc_divergence_pl_250" },
              { label: "200 hPA", value: "oper_fc_divergence_pl_200" },
              { label: "50 hPA", value: "oper_fc_divergence_pl_50" },
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