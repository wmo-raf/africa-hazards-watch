import { fetchEcwmfSynopTimestamps } from "services/timestamps";

import { airTemperature } from "./synop-air-temperature";
import { dewTemperature } from "./synop-dew-temperature";
import { atmosphericPressure } from "./synop-atmos-pressure";
import { windSpeedDirection } from "./synop-wind";
import { skyCoverage } from "./synop-sky-cover";

const datasetName = "Synoptic Charts";
const layerName = "synoptic_charts";
const metadataId = "60fcce77-8b70-4acf-b2a7-e18208db4cde";

const category = "weather";
const subCategory = "synop-observations";

const generateLayers = (timestamps = []) => {
  const latest = "";

  return [
    {
      name: datasetName,
      id: layerName,
      type: "layer",
      citation: "",
      default: true,
      active: true,
      dataset: layerName,
      layerConfig: {
        type: "vector",
        source: {
          tiles: [
            `http://20.56.94.119/pg4w/tileserv/public.synop_obs/{z}/{x}/{y}.pbf?date={time}`,
          ],
          type: "vector",
        },
        render: {
          layers: [
            {
              type: "circle",

              "source-layer": "default",
              metadata: {
                position: "top",
              },
              paint: {
                "circle-color": "white",
                "circle-opacity": 0,
                "circle-radius": 40,
              },
            },
          ],
        },
      },
      legendConfig: {},
      params: {
        time: `${latest}`,
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
            column: "air_temperature",
            property: "Air Temperature",
            units: "°C",
          },
          {
            column: "dewpoint_temperature",
            property: "Dew Point Temperature",
            units: "°C",
          },
          {
            column: "pressure_reduced_to_mean_sea_level",
            property: "Atmospheric Pressure",
            units: "Hpa",
          },
          {
            column: "wind_speed",
            property: "Wind Speed",
            units: "M/s",
          },
          {
            column: "wind_direction",
            property: "Wind Direction",
            units: "°",
          },
        ],
      },
      isMultiLayer: true,
      nestedLegend: true,
    },
    ...airTemperature(timestamps),
    ...dewTemperature(timestamps),
    ...atmosphericPressure(timestamps),
    ...skyCoverage(timestamps),
    ...windSpeedDirection(timestamps),
  ];
};

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "GTS Synop, 3 Hourly",
    isMultiLayer: true,
    global: true,
    capabilities: ["timeseries"],
    layers: generateLayers([]),
  },
];

const updates = [
  {
    layer: layerName,
    getTimestamps: (params = {}, token) => {
      return fetchEcwmfSynopTimestamps().then((res) => {
        const timestamps = res.data || [];

        return timestamps;
      });
    },
    getCurrentLayerTime: (timestamps) => {
      const now = new Date().setMinutes(0, 0, 0);

      const nowDate = new Date(now).toISOString();

      const hasDate = timestamps.includes(nowDate);

      if (hasDate) {
        return nowDate;
      }

      return timestamps[timestamps.length - 1];
    },
    updateInterval: 900000, // 15 minutes
  },
];

export default { datasets, updates };
