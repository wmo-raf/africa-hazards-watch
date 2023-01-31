import {
  countries,
  chCountries,
  chCountriesBorder,
  countriesHighlight,
  countriesMask,
  areasHighlight,
  areas,
  areasGroup,
  areasFamine,
  areasGroupFamine,
  urbanAreas,
  urbanAreasCenter,
  idp,
  idpHover,
  areasBorder,
  areasGroupBorder,
  areasLabels,
  bags,
} from "./layers";

const layerData = {
  countries: { ...countries },
  chCountries: { ...chCountries },
  chCountriesBorder: { ...chCountriesBorder },
  countriesHighlight: { ...countriesHighlight },
  countriesMask: { ...countriesMask },
  areasHighlight: { ...areasHighlight },
  areas: { ...areas },
  areasGroup: { ...areasGroup },
  areasFamine: { ...areasFamine },
  areasGroupFamine: { ...areasGroupFamine },
  urbanAreas: { ...urbanAreas },
  urbanAreasCenter: { ...urbanAreasCenter },
  idp: { ...idp },
  idpHover: { ...idpHover },
  areasNegative: JSON.parse(JSON.stringify(areas)),
  areasBorder: { ...areasBorder },
  areasGroupBorder: { ...areasGroupBorder },
  areasLabels: { ...areasLabels },
  bags: { ...bags },
};

layerData.areasNegative.layerId = "areas-negative";
layerData.areasNegative.paint["fill-opacity"] = 0;

const activeCondition = "A";
const yearCurrent = true;
const activeYear = 2021;
const activePhases = [6, 5, 4, 3, 2, 1, 0, 9];
const africaCountries = [
  "DZ",
  "AO",
  "BJ",
  "BJ",
  "BF",
  "BI",
  "CM",
  "CV",
  "CF",
  "TD",
  "KM ",
  "CG",
  "CI",
  "CD",
  "DJ",
  "EG",
  "GQ",
  "ER",
  "ET",
  "GA",
  "GM",
  "GH",
  "GN",
  "GW",
  "KE",
  "LS",
  "LR",
  "LY",
  "MG",
  "MW",
  "ML",
  "MR",
  "MU",
  "YT",
  "MA",
  "MZ",
  "NE",
  "NG",
  "RE",
  "RW",
  "SH",
  "ST",
  "SN",
  "SC",
  "SL",
  "SO",
  "ZA",
  "SS",
  "SD",
  "SZ",
  "TZ",
  "TG",
  "TB",
  "UG",
  "EH",
  "ZM",
  "ZW",
];

const state = {
  allowGlobal: true,
  showMask: false,
  areaDefaultFilter: ["all"],
  areaCountryFilter: ["in", ["get", "country"], ["literal", africaCountries]],
  negativeCountryFilter: ["!=", ["get", "country"], ""],
  areaLabelsFilter: ["==", ["get", "country"], "NO MATCHES"],
  countryActiveFilter: ["in", "country", ""],
  countryZoomLevel: false,
};

const areaPhaseFilter = [
  "in",
  ["get", "overall_phase"],
  ["literal", activePhases],
];

const areaConditionFilter = ["==", ["get", "condition"], activeCondition];

const areaTimeFilter = yearCurrent
  ? ["==", ["get", "current"], true]
  : ["match", ["get", "year"], [activeYear], true, false];

const areasFilter = [
  ...state.areaDefaultFilter,
  state.areaCountryFilter,
  areaPhaseFilter,
  areaConditionFilter,
];

const countriesFilter = [
  ...state.areaDefaultFilter,
  areaTimeFilter,
  areaConditionFilter,
  state.areaCountryFilter,
];

areasFilter.push(areaTimeFilter);

export default [
  {
    name: "IPC - Acute Food Insecurity",
    id: "ipc_a",
    dataset: "ipc_a",
    type: "dataset",
    published: true,
    status: "saved",
    layer: "ipc_a",
    category: 3,
    sub_category: 1,
    metadata: "46f0b628-70c4-4637-a32d-1e493b97bf9d",
    layers: [
      {
        id: "ipc_a",
        dataset: "ipc_a",
        name: "IPC - Acute Food Insecurity",
        type: "layer",
        default: true,
        layerConfig: {
          type: "vector",
          source: {
            tiles: [
              "https://ipc-mvt.s3.eu-central-1.amazonaws.com/vector/{z}/{x}/{y}",
            ],
            type: "vector",
            maxzoom: 9,
          },
          render: {
            layers: [
              {
                ...layerData.areasGroup,
                filter: areasFilter,
              },
              {
                ...layerData.areas,
                filter: areasFilter,
              },
              {
                ...layerData.areasGroupFamine,
                filter: areasFilter,
              },
              {
                ...layerData.areasFamine,
                filter: areasFilter,
              },
              {
                ...layerData.areasBorder,
                filter: areasFilter,
              },
              {
                ...layerData.areasGroupBorder,
                filter: areasFilter,
              },
              {
                ...layerData.areasHighlight,
              },
              {
                ...layerData.urbanAreas,
                filter: [
                  "all",
                  ["==", ["get", "admin_type"], "urb"],
                  areaTimeFilter,
                  areaConditionFilter,
                  areaPhaseFilter,
                ],
              },
              {
                ...layerData.urbanAreasCenter,
                filter: [
                  "all",
                  ["==", ["get", "admin_type"], "urb"],
                  areaTimeFilter,
                  areaConditionFilter,
                  areaPhaseFilter,
                ],
              },
              {
                ...layerData.idp,
                filter: [
                  "all",
                  ["==", ["get", "admin_type"], "idp"],
                  areaTimeFilter,
                  areaConditionFilter,
                  areaPhaseFilter,
                ],
              },
              {
                ...layerData.idpHover,
                filter: [
                  "all",
                  ["==", ["get", "admin_type"], "idp"],
                  areaTimeFilter,
                  areaConditionFilter,
                  areaPhaseFilter,
                ],
              },
              {
                ...layerData.countries,
                filter: countriesFilter,
              },
              { ...layerData.countriesHighlight, filter: countriesFilter },
              {
                ...layerData.bags,
                filter: ["all", areaTimeFilter, state.areaCountryFilter],
              },
            ],
          },
        },
        interactionConfig: {
          admin: "adm1",
          layerId: "ipc_areas",
          isUse: false,
          output: [
            { column: "title", property: "Name" },
            { column: "overall_phase", property: "Overall Phase" },
          ],
          chartConfig: {
            type: "bar",
            title: "Population",
            items: [
              {
                property: "phase1_pop",
                color: "#cef9ce",
                label: "Phase 1 - Minimal",
              },
              {
                property: "phase2_pop",
                color: "#f9e43c",
                label: "Phase 2 - Stressed",
              },
              {
                property: "phase3_pop",
                color: "#e4781f",
                label: "Phase 3 - Crisis",
              },
              {
                property: "phase4_pop",
                color: "#c60813",
                label: "Phase 4 - Emergency",
              },
              {
                property: "phase5_pop",
                color: "#640000",
                label: "Phase 5 - Famine",
              },
            ],
          },
          type: "intersection",
        },
        analysisConfig: [
          {
            key: "population",
            type: "admin",
          },
        ],
        // filterParams: {
        //   overall_phase: { label: "All", value: "all" },
        // },
        // paramsFilterConfig: [
        //   {
        //     isMulti: true,
        //     key: "overall_phase",
        //     required: true,
        //     default: "all",
        //     sentence: "Filter by Phase {selector}",
        //     options: [
        //       { label: "All", value: "all" },
        //       { label: "1", value: 1 },
        //       { label: "2", value: 2 },
        //       { label: "3", value: 3 },
        //     ],
        //   },
        // ],
        legendConfig: {
          items: [
            { color: "#cef9ce", name: "Phase 1 - Minimal" },
            { color: "#f9e43c", name: "Phase 2 - Stressed" },
            { color: "#e4781f", name: "Phase 3 - Crisis" },
            { color: "#c60813", name: "Phase 4 - Emergency" },
            { color: "#640000", name: "Phase 5 - Famine" },
            {
              icon: "/assets/layer-icons/famine-likely.png",
              name: "Famine Likely",
            },
            { color: "#a7a7a7", name: "Areas with inadequate evidence" },
            {
              icon: "/assets/layer-icons/no-data.svg?sprite",
              name: "Areas Not Analyzed",
            },
            {
              icon: "/assets/layer-icons/urb.svg?sprite",
              name: "Urban Settlement Classification",
            },
            {
              icon: "/assets/layer-icons/idp-camp.svg?sprite",
              name: "IDPs/Other Settlement Classification",
            },
            {
              icon: "/assets/layer-icons/bag.svg?sprite",
              name:
                "At least 25% of households meet 25-50% of caloric needs from humanitarian food assistance",
            },
            {
              icon: "/assets/layer-icons/bag2.svg?sprite",
              name:
                "At least 25% of households meet over 50% of caloric needs from humanitarian food assistance",
            },
          ],
          type: "basic",
        },
        moreInfo: {
          linkText: "More details - IPC",
          linkUrl: "http://www.ipcinfo.org/",
          text:
            "Mapped Phase represents highest severity affecting at least 20% of the population.",
        },
      },
    ],
  },
];
