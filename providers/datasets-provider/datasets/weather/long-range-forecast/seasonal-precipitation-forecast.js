import { fetchTimestamps } from "services/timestamps";
import { parseISO, format, addDays, startOfHour } from "date-fns";

const datasetName = "Seasonal Precipitation Forecast";
const layerName = "seasonal_total_precipitation";
const metadataId = "";
const dataPath = "/gskydata/tera/gfs-precipitation-1-hr";

const category = 1;
const subCategory = 3;

export default [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "Multi-Model Ensemble",
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
              `http://localhost/ows/seasonal-forecast?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={year}-{month}-01T00:00:00.000Z&layers={model}_seasonal_total_precipitation_lead_{lead_time}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
        },
        legendConfig: {
          type: "gradient",
          items: [
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
            { name: "", color: "#e1545d" },
            { name: 30, color: "#be3066" },
            { name: "40 mm", color: "#93174e" },
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
