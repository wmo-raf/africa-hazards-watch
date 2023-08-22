import { fetchTimestamps } from "services/timestamps";
import { POLITICAL_BOUNDARIES_DATASET } from "data/datasets";
import { POLITICAL_BOUNDARIES } from "data/layers";

const datasetName = "Pentadal Rainfall Anomalies";
const layerName = "tamsat_pentadal_rainfall_anomaly_rfe";
const metadataId = "d991c858-15f5-4c51-8d1c-452a2147e8e4";
const dataPath =
  "/gskydata/tamsat-rainfall/tamsat_pentadal_rainfall_anomaly_rfe";
const owsNameSpace = "rainfall-estimates";

const category = "climate";
const subCategory = "rainfall_estimates";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "TAMSAT, From 1983 to recent",
    group: "tamsat",
    global: true,
    capabilities: ["clip", "timeseries"],
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        default: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://20.56.94.119/gsky/ows/${owsNameSpace}/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${layerName}&geojson_feature_id={geojson_feature_id}`,
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
              name: -30,
              color: "#ee3d00",
            },
            {
              name: -20,
              color: "#efae07",
            },
            {
              name: -10,
              color: "#faf790",
            },
            {
              name: 10,
              color: "#ffffff",
            },
            {
              name: 20,
              color: "#c1f0ff",
            },
            {
              name: 30,
              color: "#7fc1ee",
            },
            {
              name: 40,
              color: "#4b91ff",
            },
          ],
        },
        params: {
          time: "",
          geojson_feature_id: "",
        },
        paramsSelectorConfig: [
          {
            key: "time",
            required: true,
            sentence: "{selector}",
            type: "datetime",
            dateFormat: { currentTime: "mmm yyyy", asPeriod: "pentadal" },
            availableDates: [],
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
        gskyAnalysisConfig: {
          widget: layerName,
          wpsIdentifier: layerName,
          owsNameSpace: owsNameSpace,
          title: "TAMSAT - Pentadal Rainfall Anomaly For {location}",
          categories: ["summary"],
          types: ["country", "geostore", "point"],
          admins: ["adm0", "adm1", "adm2"],
          large: true,
          metaKey: "",
          sortOrder: {},
          visible: ["analysis", "dashboard"],
          chartType: "composedChart",
          colors: "weather",
          sentences: {},
          settings: {
            time: "",
          },
          refetchKeys: ["time"],
          requiresTime: true,
          datasets: [
            {
              dataset: POLITICAL_BOUNDARIES_DATASET,
              layers: [POLITICAL_BOUNDARIES],
              boundary: true,
            },
            // forecast
            {
              dataset: layerName,
              layers: [layerName],
            },
          ],
          plotConfig: {
            byCurrentDataPentad: true,
            isAnomaly: true,
            inverseAnomalyColor: true,
            simpleNeedsAxis: true,
            height: 250,
            xKey: "year",
            yKeys: {
              bars: {
                value: {
                  yAxisId: "value",
                  itemColor: true,
                },
              },
            },
            unit: " mm",
            yAxis: {
              yAxisId: "value",
              domain: ["auto", "auto"],
            },
            referenceLine: {
              y: 0,
              yAxisId: "value",
            },
            tooltip: [
              {
                key: "date",
                label: "Pentad",
                formatConfig: { formatDate: true, dateFormat: "MMM yyyy dd" },
              },
              {
                key: "value",
                label: "Anomaly",
                formatConfig: { formatNumber: true, units: "mm" },
              },
            ],
          },
        },
      },
    ],
  },
];

const updates = [
  {
    layer: layerName,
    getTimestamps: (params = {}, token) => {
      return fetchTimestamps(dataPath).then((res) => {
        const timestamps = (res.data && res.data.timestamps) || [];

        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      return timestamps[timestamps.length - 1];
    },
  },
];

export default { datasets, updates };
