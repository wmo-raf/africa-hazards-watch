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

const category = "agriculture";
const subCategory = "food-security";

const datasetName = "IPC - Acute Food Insecurity";
const layerId = "ipc_a";

const AFRICA_IPC_COUNTRIES_ALL = [
  { iso2: "DZ", iso3: "DZA" },
  { iso2: "AO", iso3: "AGO" },
  { iso2: "BJ", iso3: "BEN" },
  { iso2: "BF", iso3: "BFA" },
  { iso2: "BI", iso3: "BDI" },
  { iso2: "CM", iso3: "CMR" },
  { iso2: "CV", iso3: "CPV" },
  { iso2: "CF", iso3: "CAF" },
  { iso2: "TD", iso3: "TCD" },
  { iso2: "KM", iso3: "COM" },
  { iso2: "CG", iso3: "COG" },
  { iso2: "CI", iso3: "CIV" },
  { iso2: "CD", iso3: "COD" },
  { iso2: "DJ", iso3: "DJI" },
  { iso2: "EG", iso3: "EGY" },
  { iso2: "GQ", iso3: "GNQ" },
  { iso2: "ER", iso3: "ERI" },
  { iso2: "EH", iso3: "EH" },
  { iso2: "ET", iso3: "ETH" },
  { iso2: "GA", iso3: "GAB" },
  { iso2: "GM", iso3: "GMB" },
  { iso2: "GH", iso3: "GHA" },
  { iso2: "GN", iso3: "GIN" },
  { iso2: "GW", iso3: "GNB" },
  { iso2: "KE", iso3: "KEN" },
  { iso2: "LS", iso3: "LS)" },
  { iso2: "LR", iso3: "LRR" },
  { iso2: "LY", iso3: "LBY" },
  { iso2: "MG", iso3: "MGG" },
  { iso2: "ML", iso3: "MLI" },
  { iso2: "MW", iso3: "MWI" },
  { iso2: "MR", iso3: "MRT" },
  { iso2: "MU", iso3: "MUS" },
  { iso2: "YT", iso3: "MYT" },
  { iso2: "MA", iso3: "MAR" },
  { iso2: "MZ", iso3: "MOZ" },
  { iso2: "NA", iso3: "NAM" },
  { iso2: "NE", iso3: "NER" },
  { iso2: "NG", iso3: "NGA" },
  { iso2: "RE", iso3: "REE" },
  { iso2: "RW", iso3: "RWA" },
  { iso2: "SH", iso3: "SHN" },
  { iso2: "ST", iso3: "STP" },
  { iso2: "SN", iso3: "SEN" },
  { iso2: "SC", iso3: "SYC" },
  { iso2: "SL", iso3: "SLE" },
  { iso2: "SO", iso3: "SOM" },
  { iso2: "SS", iso3: "SSD" },
  { iso2: "SD", iso3: "SDN" },
  { iso2: "SZ", iso3: "SWZ" },
  { iso2: "TG", iso3: "TGO" },
  { iso2: "TZ", iso3: "TZA" },
  { iso2: "UG", iso3: "UGA" },
  { iso2: "ZA", iso3: "ZAF" },
  { iso2: "ZM", iso3: "ZMB" },
  { iso2: "ZW", iso3: "ZWE" },
];

const getLayers = (selectedCountries) => {
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

  const state = {
    allowGlobal: true,
    showMask: false,
    areaDefaultFilter: ["all"],
    areaCountryFilter: [
      "in",
      ["get", "country"],
      ["literal", selectedCountries],
    ],
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

  const layers = [
    {
      id: layerId,
      dataset: layerId,
      name: datasetName,
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
        layerId: layerId,
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
            icon: "/assets/layer-icons/no-data.svg",
            name: "Areas Not Analyzed",
          },
          {
            icon: "/assets/layer-icons/urb.svg",
            name: "Urban Settlement Classification",
          },
          {
            icon: "/assets/layer-icons/idp-camp.svg",
            name: "IDPs/Other Settlement Classification",
          },
          {
            icon: "/assets/layer-icons/bag.svg",
            name:
              "At least 25% of households meet 25-50% of caloric needs from humanitarian food assistance",
          },
          {
            icon: "/assets/layer-icons/bag2.svg",
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
  ];

  return layers;
};

const datasets = [
  {
    name: datasetName,
    id: layerId,
    dataset: layerId,
    type: "dataset",
    published: true,
    layer: layerId,
    category: category,
    sub_category: subCategory,
    metadata: "46f0b628-70c4-4637-a32d-1e493b97bf9d",
    global: true,
    layers: getLayers(AFRICA_IPC_COUNTRIES_ALL.map((c) => c.iso2)),
  },
];

const getDatasetsForCountry = (countryIso) => {
  let countries = AFRICA_IPC_COUNTRIES_ALL;

  if (countryIso !== "africa") {
    countries = AFRICA_IPC_COUNTRIES_ALL.filter((c) => c.iso3 === countryIso);
  }

  const datasets = [
    {
      name: datasetName,
      id: layerId,
      dataset: layerId,
      type: "dataset",
      published: true,
      layer: layerId,
      category: category,
      sub_category: subCategory,
      metadata: "46f0b628-70c4-4637-a32d-1e493b97bf9d",
      global: true,
      layers: getLayers(countries.map((c) => c.iso2)),
    },
  ];

  return datasets;
};

export default { datasets, getDatasetsForCountry };
