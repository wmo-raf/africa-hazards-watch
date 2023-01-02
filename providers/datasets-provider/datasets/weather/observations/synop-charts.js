import { fetchSynopTimestamps } from "services/timestamps";
import { parseISO, format, addDays } from "date-fns";
import { airTemperature } from "./synop-air-temperature";
import { dewTemperature } from "./synop-dew-temperature";
import { atmosphericPressure } from "./synop-atmos-pressure";
import { windSpeedDirection } from "./synop-wind";
import { skyCoverage } from "./synop-sky-cover";
import { PG_WEATHER_FEATURESERV_URL } from "utils/apis";

const datasetName = "Synoptic Charts";
const layerName = "synoptic_charts";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = 1;
const subCategory = 4;
const dataPath = "/air_temperature";

const generateLayers = (timestamps = []) => {
  const latest = timestamps[timestamps.length - 1];

  if (!latest) {
    return [];
  }

  const time = parseISO(latest);
  const end = addDays(time, 7);
  const dateFormat = "mmm, yyyy";

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
      "active": true,
      dataset: layerName,
      layerConfig: {
        type: "vector",
        source: {
          tiles: [
            `${PG_WEATHER_FEATURESERV_URL}/public.hourly_synop/{z}/{x}/{y}.pbf?selected_date={time}`,
          ],
          type: "vector",
        },
        render: {
          layers: [
            {
              'type': 'circle',

              "source-layer": "default",
              metadata: {
                position: "top",
              },
              'paint': {
                "circle-color": "white",
                "circle-opacity":0,
                "circle-radius":40
              }

            }
          ],

        },
      },
      legendConfig: {

      },
      params: {
        time: `${latest}`
      },
      paramsSelectorColumnView: true,
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
      interactionConfig: {
        output: [
          { column: "name", property: "Name" },
          {
            column: "air_temperature", property: "Air Temperature",
            units: "°C"
          },
          {
            column: "dewpoint_temperature", property: "Dew Point Temperature",
            units: "°C"
          },
          {
            column: "atm_pressure", property: "Atmospheric Pressure",
            units: "Hpa"
          },
          {
            column: "wind_speed", property: "Wind Speed",
            units: "Knots"
          },
          {
            column: "wind_direction", property: "Wind Direction",
            units: "°"
          },
          { column: "message", property: "Message", },
        ],
      },

      "isMultiLayer": true,
      "nestedLegend": true
    },

    ...airTemperature(timestamps),
    ...dewTemperature(timestamps),
    ...atmosphericPressure(timestamps),
    ...skyCoverage(timestamps),
    ...windSpeedDirection(timestamps),



  ]
}


export default [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "GTS Synop, 3 Hourly",
    "isMultiLayer": true,

    getLayers: async () => {
      return await fetchSynopTimestamps(dataPath)
        .then((res) => {
          const timestamps = (res.data && res.data.timestamps) || [];
          return generateLayers(timestamps);

        })
        .catch(() => {
          return generateLayers([]);
        });
    },
  },
];
