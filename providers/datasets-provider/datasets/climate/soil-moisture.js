import range from "lodash/range";

const getYearsOptions = () => {
  return range(1982, 2017).map((y) => ({
    label: y,
    value: y,
  }));
};

const DATASET_EXTENTS = [
  36.2457735061645465,
  -0.342089600904139,
  37.8745360183715789,
  1.071453748669239,
];

export default [
  {
    id: "tht_historical",
    dataset: "tht_historical",
    name: "Soil Moisture - Historical",
    layer: "tht_historical",
    active: true,
    category: 2,
    sub_category: 2,
    metadata: "dd5c432e-85fa-4c62-b2b0-7cade3f0908e",
    citation: "",
    layers: [
      {
        name: "Soil Moisture - Historical",
        id: "tht_historical",
        dataset: "tht_historical",
        layerConfig: {
          type: "vector",
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              "https://eahazardswatch.icpac.net/pg/tileserv/eagrid.hydro_historical_tht/{z}/{x}/{y}.pbf?year={year}&season={season}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                type: "fill",
                "source-layer": "eagrid.hydro_historical_tht",
                filter: ["has", "tht"],
                paint: {
                  "fill-color": {
                    type: "interval",
                    property: "tht",
                    stops: [
                      [0, "#ebf7e7"],
                      [10, "#c3e7bc"],
                      [30, "#88cd86"],
                      [50, "#41ab5c"],
                      [70, "#1d7e3a"],
                      [90, "#0d491d"],
                    ],
                  },
                },
              },
            ],
          },
          extent: DATASET_EXTENTS,
          zoomToExtent: true,
        },
        params: {
          year: "2016",
          season: "3",
        },
        paramsSelectorConfig: [
          {
            key: "year",
            type: "select",
            options: getYearsOptions(),
            required: true,
            sentence: "Year {selector}",
          },
          {
            key: "season",
            type: "select",
            options: [
              {
                label: "DJF",
                value: "0",
              },
              {
                label: "JFM",
                value: "1",
              },
              {
                label: "FMA",
                value: "2",
              },
              {
                label: "MAM",
                value: "3",
              },
              {
                label: "AMJ",
                value: "4",
              },
              {
                label: "MJJ",
                value: "5",
              },
              {
                label: "JJA",
                value: "6",
              },
              {
                label: "JAS",
                value: "7",
              },
              {
                label: "ASO",
                value: "8",
              },
              {
                label: "SON",
                value: "9",
              },
              {
                label: "OND",
                value: "10",
              },
              {
                label: "NDJ",
                value: "11",
              },
            ],
            required: true,
            sentence: "Season {selector}",
          },
        ],
        legendImage: {
          url:
            "https://eahazardswatch.icpac.net/cms/media/images/soilmoisture_historical_uJrzO2j.original.png",
        },
        legendConfig: {
          type: "basic",
          items: [
            { name: "", color: "#ebf7e7" },
            { name: "30%", color: "#c3e7bc" },
            { name: "50%", color: "#88cd86" },
            { name: "70%", color: "#41ab5c" },
            { name: "90", color: "#1d7e3a" },
            { name: "", color: "#0d491d" },
          ],
        },
      },
    ],
  },
  {
    id: "tht_forecast_quantile_prob",
    dataset: "tht_forecast_quantile_prob",
    name: "Soil Moisture Forecast - Tercile Probability",
    layer: "tht_forecast_quantile_prob",
    active: true,
    category: 2,
    sub_category: 2,
    metadata: "0afa423b-d333-4369-9049-ea2897d58cd8",
    citation: "",
    layers: [
      {
        name: "Soil Moisture Forecast - Tercile Probability",
        id: "tht_forecast_quantile_prob",
        dataset: "tht_forecast_quantile_prob",
        layerConfig: {
          type: "vector",
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              "https://eahazardswatch.icpac.net/pg/tileserv/eagrid.hydro_forecast_quantile_prob/{z}/{x}/{y}.pbf?year={year}&season={season}&variable=tht&eventcategory={eventCategory}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                type: "fill",
                "source-layer": "eagrid.hydro_forecast_quantile_prob",
                filter: ["has", "val"],

                paint: {
                  "fill-color": {
                    type: "interval",
                    property: "val",
                    stops: [
                      [0, "#538b53"],
                      [20, "#7dce7d"],
                      [25, "#9aff9b"],
                      [30, "#bfbfbf"],
                      [35, "#ac83ff"],
                      [40, "#8a68ce"],
                      [45, "#5d458c"],
                    ],
                  },
                },
              },
            ],
          },
          extent: DATASET_EXTENTS,
          zoomToExtent: true,
        },
        params: {
          year: "2022",
          season: "MAM",
          eventCategory: "0",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "year",
            type: "select",
            options: [
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
            ],
            required: true,
            sentence: "Year {selector}",
          },
          {
            key: "season",
            type: "select",
            options: [
              {
                label: "MAM",
                value: "MAM",
              },
              {
                label: "OND",
                value: "OND",
              },
            ],
            required: true,
            sentence: "Season {selector}",
          },
          {
            key: "eventCategory",
            type: "radio",
            options: [
              {
                label: "Above normal",
                value: "0",
              },
              {
                label: "Near normal",
                value: "1",
              },
              {
                label: "Below normal",
                value: "2",
              },
            ],
            required: true,
            sentence: "Event Category {selector}",
          },
        ],
        legendImage: {
          url:
            "https://eahazardswatch.icpac.net/cms/media/images/tercile_probabilities_UWt8EdB.original.png",
        },
        legendConfig: {
          type: "basic",
          items: [
            { name: "<=10%", color: "#538b53" },
            { name: "> 10% and <=20%", color: "#7dce7d" },
            { name: "> 20% and <= 25%", color: "#9aff9b" },
            { name: "> 25% and <= 30%", color: "#bfbfbf" },
            { name: "> 30% and <= 35%", color: "#ac83ff" },
            { name: ">35 and <= 40%", color: "#8a68ce" },
            { name: ">= 45%", color: "#5d458c" },
          ],
        },
      },
    ],
  },
  {
    id: "tht_forecast_physical_prob",
    dataset: "tht_forecast_physical_prob",
    name: "Soil Moisture Forecast - Physical Probability",
    layer: "tht_forecast_physical_prob",
    active: true,
    category: 2,
    sub_category: 2,
    metadata: "4b1c3028-3ecf-416d-95b9-d305fd3278bb",
    citation: "",
    layers: [
      {
        name: "Soil Moisture Forecast - Physical Probability",
        id: "tht_forecast_physical_prob",
        dataset: "tht_forecast_physical_prob",
        layerConfig: {
          type: "vector",
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              "https://eahazardswatch.icpac.net/pg/tileserv/eagrid.hydro_forecast_physical_prob/{z}/{x}/{y}.pbf?year={year}&season={season}&variable=tht&physicalthreshold={physicalThreshold}",
            ],
            type: "vector",
          },
          render: {
            layers: [
              {
                type: "fill",
                "source-layer": "eagrid.hydro_forecast_physical_prob",
                filter: ["has", "val"],
                paint: {
                  "fill-color": {
                    type: "interval",
                    property: "val",
                    stops: [
                      [0, "#b4b4b4"],
                      [10, "#BB3426"],
                      [20, "#D44F24"],
                      [30, "#EF7424"],
                      [40, "#FFA229"],
                      [50, "#FFBD2D"],
                      [60, "#FFD931"],
                      [70, "#FFF636"],
                      [80, "#C6FF35"],
                      [90, "#75FF32"],
                      [100, "#02FF30"],
                    ],
                  },
                },
              },
            ],
          },
          extent: DATASET_EXTENTS,
          zoomToExtent: true,
        },
        params: {
          year: "2022",
          season: "MAM",
          physicalThreshold: "0",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "year",
            type: "select",
            options: [
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
            ],
            required: true,
            sentence: "Year {selector}",
          },
          {
            key: "season",
            type: "select",
            options: [
              {
                label: "MAM",
                value: "MAM",
              },
              {
                label: "OND",
                value: "OND",
              },
            ],
            required: true,
            sentence: "Season {selector}",
          },
          {
            key: "physicalThreshold",
            type: "radio",
            options: [
              {
                label:
                  "Average soil moisture in severe plant stress conditions",
                value: "0",
              },
            ],
            required: true,
            sentence: "Physical Threshold {selector}",
          },
        ],
        legendImage: {
          url:
            "https://eahazardswatch.icpac.net/cms/media/images/physical_probabilities_QBNlsxf.original.png",
        },
        legendConfig: {
          type: "basic",
          items: [
            {
              color: "#b4b4b4",
              name: "0%",
            },
            {
              color: "#BB3426",
              name: "10%",
            },
            {
              color: "#D44F24",
              name: "20%",
            },
            {
              color: "#EF7424",
              name: "30%",
            },
            {
              color: "#FFA229",
              name: "40%",
            },
            {
              color: "#FFBD2D",
              name: "50%",
            },
            {
              color: "#FFD931",
              name: "60%",
            },
            {
              color: "#FFF636",
              name: "70%",
            },
            {
              color: "#C6FF35",
              name: "80%",
            },
            {
              color: "#75FF32",
              name: "90%",
            },
            {
              color: "#02FF30",
              name: "100%",
            },
          ],
        },
      },
    ],
  },
];
