import { fetchTimestamps } from "services/timestamps";
import { parseISO, format, addDays, startOfHour } from "date-fns";

const datasetName = "Seasonal Temperature Forecast";
const layerName = "seasonal_temperature_2m";
const metadataId = "";
const dataPath = "/gskydata/tera/gfs-precipitation-1-hr";

const category = "weather";
const subCategory = "long-range-forecast";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "Multi-Model Ensemble",
    global: true,
    layers: [
      {
        name: datasetName,
        id: layerName,
        type: "layer",
        default: true,
        active: true,
        dataset: layerName,
        layerConfig: {
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              `http://localhost/ows/seasonal-forecast/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={year}-{month}-01T00:00:00.000Z&layers={model}_seasonal_temperature_2m_lead_{lead_time}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
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
          year: "2022",
          month: "07",
          lead_time: "2",
          model: "ecmwf",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "year",
            required: true,
            options: [{ label: "2022", value: "2022" }],
            sentence: "Year {selector}",
          },
          {
            key: "month",
            required: true,
            options: [
              { label: "January", value: "01" },
              { label: "Feb", value: "02" },
              { label: "Mar", value: "03" },
              { label: "Apr", value: "04" },
              { label: "May", value: "05" },
              { label: "June", value: "06" },
              { label: "July", value: "07" },
              { label: "Aug", value: "08" },
              { label: "Sep", value: "09" },
              { label: "Oct", value: "10" },
              { label: "Nov", value: "11" },
              { label: "Dec", value: "12" },
            ],
            sentence: "Issued Month {selector}",
          },
          {
            key: "lead_time",
            required: true,
            type: "radio",
            options: [
              { label: "1 Month", value: "1" },
              { label: "2 Months", value: "2" },
              { label: "3 Months", value: "3" },
              { label: "4 Months", value: "4" },
              { label: "5 Months", value: "5" },
              { label: "6 Months", value: "6" },
            ],
            sentence: "Lead Time {selector}",
          },
          {
            key: "model",
            required: true,
            type: "radio",
            options: [
              { label: "ECMWF", value: "ecmwf" },
              { label: "UK Met Office", value: "ukmo" },
              { label: "Météo France", value: "meteofrance" },
              { label: "DWD", value: "dwd" },
              { label: "CMCC", value: "cmcc" },
              { label: "NCEP", value: "ncep" },
              { label: "JMA", value: "jma" },
              { label: "ECCC", value: "eccc" },
            ],
            sentence: "Forecast Models {selector}",
          },
        ],
      },
    ],
  },
];

const updates = [];

export { datasets, updates };
