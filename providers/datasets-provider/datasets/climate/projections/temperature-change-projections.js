const datasetName = "Mean Temperature Projections";
const layerName = "mean_temperature_projections";
const metadataId = "";
const dataPath = "";

const category = "climate";
const subCategory = "climate-projections";

const datasets = [
  {
    name: datasetName,
    id: layerName,
    dataset: layerName,
    layer: layerName,
    category: category,
    sub_category: subCategory,
    metadata: metadataId,
    citation: "CMIP6 Projection, Up to 2100",
    global: true,
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
              `http://20.56.94.119/gsky/ows/climatechange/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=tas_{scenario}_{period}_{quantity}&geojson_feature_id={geojson_feature_id}`,
            ],
            minzoom: 3,
            maxzoom: 12,
          },
          canClipToGeom: true,
        },
        params: {
          scenario: "ssp245",
          period: "near_2021_2040",
          time: "2031-01-01T00:00:00.000Z",
          quantity: "change",
          geojson_feature_id: "",
        },
        paramsSelectorColumnView: true,
        paramsSelectorConfig: [
          {
            key: "quantity",
            required: true,
            type: "radio",
            sentence: "Quantity {selector}",
            options: [
              {
                label: "Change - deg C",
                value: "change",
                description: "Change from historical baseline (1995 - 2014)",
              },
              {
                label: "Value - deg C",
                value: "abs",
                description: "Absolute Mean Value",
                linkedLegendConfig: {},
              },
            ],
          },
          {
            key: "scenario",
            required: true,
            sentence: "Scenario {selector}",
            selectorDescription:
              "Shared Socioeconomic Pathways - scenarios of projected socioeconomic global changes up to 2100.",
            type: "radio",
            options: [
              {
                label: "SSP1-2.6 - Low Emission",
                value: "ssp126",
                description:
                  "Sustainability (Taking the Green Road). Low GHG emissions, CO2 emissions cut to net zero around 2050",
              },
              {
                label: "SSP2-4.5 - Intermediate Emission",
                value: "ssp245",
                description:
                  "Middle of the Road. Intermediate GHG emissions, CO2 emissions around current levels until 2050, then falling but not reaching net zero by 2100",
              },
              {
                label: "SSP3-7.0 - High Emission",
                value: "ssp370",
                description:
                  "Regional Rivalry (A Rocky Road). High GHG emissions, CO emissions double by 2100",
              },
              {
                label: "SSP5-8.5 - Very High Emission",
                value: "ssp585",
                description:
                  "Fossil-fueled Development (Taking the Highway). Very high GHG emissions, CO2 emissions triple by 2075",
              },
            ],
          },
          {
            key: "period",
            required: true,
            type: "radio",
            sentence: "Period {selector}",
            options: [
              {
                label: "Near Term - 2021 to 2040",
                value: "near_2021_2040",
                linkedParams: { time: "2031-01-01T00:00:00.000Z" },
                description: "Warming that will happen between 2021-2040",
              },
              {
                label: "Medium Term - 2041 to 2060",
                value: "medium_2041_2060",
                linkedParams: { time: "2051-01-01T00:00:00.000Z" },
                description: "Warming that will happen by 2060 ",
              },
              // {
              //   label: "Medium Term - 2061 to 2080",
              //   value: "medium_2061_2080",
              //   linkedParams: { time: "2071-01-01T00:00:00.000Z" },
              // },
              {
                label: "Long Term - 2081 to 2100",
                value: "long_2081_2100",
                linkedParams: { time: "2091-01-01T00:00:00.000Z" },
                description: "Warming that will happen by 2100",
              },
            ],
          },
        ],
        legendConfig: {
          type: "gradient",
          items: [],
        },
        dynamicLegendByParamConfig: {
          quantity: {
            change: {
              type: "gradient",
              items: [
                {
                  name: "",
                  color: "#104680",
                },
                {
                  name: -5.0,
                  color: "#1c5d9f",
                },
                {
                  name: "",
                  color: "#2971b2",
                },
                {
                  name: -4.0,
                  color: "#3784bb",
                },
                {
                  name: "",
                  color: "#4a97c5",
                },
                {
                  name: -3.0,
                  color: "#6aacd0",
                },
                {
                  name: "",
                  color: "#8bc1dc",
                },
                {
                  name: -2.0,
                  color: "#a7d0e4",
                },
                {
                  name: "",
                  color: "#c1ddec",
                },
                {
                  name: -1.0,
                  color: "#d7e8f1",
                },
                {
                  name: "",
                  color: "#e6f0f4",
                },
                {
                  name: "0",
                  color: "#f7f7f7",
                },
                {
                  name: "",
                  color: "#faebe3",
                },
                {
                  name: 1.0,
                  color: "#fce0cf",
                },
                {
                  name: "",
                  color: "#fbceb6",
                },
                {
                  name: 2.0,
                  color: "#f7b799",
                },
                {
                  name: "",
                  color: "#f29f7e",
                },
                {
                  name: 3.0,
                  color: "#e58267",
                },
                {
                  name: "",
                  color: "#d96651",
                },
                {
                  name: 4.0,
                  color: "#ca4842",
                },
                {
                  name: "",
                  color: "#bb2a34",
                },
                {
                  name: "5",
                  color: "#a51429",
                },
                {
                  name: "",
                  color: "#860a24",
                },
              ],
            },
            abs: {
              type: "gradient",
              items: [
                {
                  color: "#fefbc1",
                },
                {
                  color: "#fdf7b8",
                },
                {
                  color: "#fdf4b0",
                },
                {
                  color: "#fcf0a6",
                },
                {
                  color: "#fbed9d",
                },
                {
                  color: "#fae893",
                },
                {
                  color: "#f9e389",
                },
                {
                  color: "#f8df81",
                },
                {
                  color: "#f7d878",
                },
                {
                  name: "0",
                  color: "#f5d26f",
                },
                {
                  color: "#f4cb67",
                },
                {
                  color: "#f2c362",
                },
                {
                  color: "#f0bd5d",
                },
                {
                  color: "#eeb659",
                },
                {
                  color: "#edaf57",
                },
                {
                  color: "#eba854",
                },
                {
                  color: "#eaa253",
                },
                {
                  color: "#e99d53",
                },
                {
                  color: "#e89752",
                },
                {
                  name: 10.0,
                  color: "#e69051",
                },
                {
                  color: "#e58a50",
                },
                {
                  color: "#e38350",
                },
                {
                  color: "#e17e50",
                },
                {
                  color: "#df774f",
                },
                {
                  color: "#db704e",
                },
                {
                  color: "#d6694d",
                },
                {
                  color: "#d1624c",
                },
                {
                  color: "#cb5d4b",
                },
                {
                  color: "#c35749",
                },
                {
                  name: 20.0,
                  color: "#bb5148",
                },
                {
                  color: "#b14c45",
                },
                {
                  color: "#a84843",
                },
                {
                  color: "#a04541",
                },
                {
                  color: "#97423d",
                },
                {
                  color: "#8d403a",
                },
                {
                  color: "#833d36",
                },
                {
                  color: "#7a3931",
                },
                {
                  color: "#72372e",
                },
                {
                  color: "#68342a",
                },
                {
                  name: 30.0,
                  color: "#5f3126",
                },
                {
                  color: "#552e21",
                },
                {
                  color: "#4d2b1d",
                },
                {
                  color: "#46291a",
                },
                {
                  color: "#3d2616",
                },
                {
                  color: "#352412",
                },
                {
                  color: "#2d210e",
                },
                {
                  color: "#281f0a",
                },
                {
                  color: "#241d07",
                },
                {
                  name: "40",
                  color: "#1e1b04",
                },
              ],
            },
          },
        },
        analysisConfig: [
          {
            key: "temperature_projections",
            type: "admin",
          },
        ],
      },
    ],
  },
];

const updates = [];

export default { datasets, updates };
