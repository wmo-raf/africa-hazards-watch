export const countries = {
  id: "ipc_countries",
  type: "fill",
  "source-layer": "countries",
  layout: {},
  paint: {
    "fill-color": "#333333",
    "fill-opacity": ["case", ["==", ["get", "mask"], true], 0.5, 0],
  },
};

export const chCountries = {
  layerId: "chcountries",
  type: "fill",
  "source-layer": "chcountries",
  layout: {},
  paint: {
    "fill-opacity": 0,
  },
};

export const chCountriesBorder = {
  layerId: "chcountriesBorder",
  type: "line",
  "source-layer": "chcountries",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": "#95e3fc",
    "line-width": 10,
  },
};

export const countriesHighlight = {
  layerId: "countries-highlight",
  type: "line",
  "source-layer": "countries",
  paint: {
    "line-color": "#000000",
    "line-width": ["interpolate", ["linear"], ["zoom"], 3, 2, 6, 3],
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0,
    ],
  },
};

export const countriesMask = {
  layerId: "countries-mask",
  type: "fill",
  "source-layer": "mask",
  paint: {
    "fill-color": "#ffffff",
    "fill-opacity": 0,
  },
};

export const areasHighlight = {
  layerId: "areas-highlight",
  type: "line",
  "source-layer": "areas",
  layout: {},
  paint: {
    "line-color": "#000000",
    "line-width": 2,
    "line-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0,
    ],
  },
};

export const areas = {
  id: "ipc_areas",
  type: "fill",
  "source-layer": "areas",
  layout: {},
  paint: {
    "fill-color": [
      "case",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 1],
      ],
      "#cef9ce",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 2],
      ],
      "#f9e43c",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 3],
      ],
      "#e4781f",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 4],
      ],
      "#c60813",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 5],
      ],
      "#640000",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 1],
      ],
      "rgb(204, 255, 204)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 2],
      ],
      "rgb(203, 201, 226)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 3],
      ],
      "rgb(158, 154, 200)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 4],
      ],
      "rgb(106, 81, 163)",
      ["==", ["get", "overall_phase"], 9],
      "#a6a6a6",
      "hsl(0, 0%, 100%)",
    ],
    "fill-antialias": false,
    "fill-opacity": 0.9,
  },
};

export const areasGroup = {
  layerId: "areasGroup",
  type: "fill",
  "source-layer": "groups",
  layout: {},
  paint: {
    "fill-color": [
      "case",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 1],
      ],
      "#cef9ce",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 2],
      ],
      "#f9e43c",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 3],
      ],
      "#e4781f",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 4],
      ],
      "#c60813",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 5],
      ],
      "#640000",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 1],
      ],
      "rgb(204, 255, 204)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 2],
      ],
      "rgb(203, 201, 226)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 3],
      ],
      "rgb(158, 154, 200)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 4],
      ],
      "rgb(106, 81, 163)",
      ["==", ["get", "overall_phase"], 9],
      "#a6a6a6",
      "hsl(0, 0%, 100%)",
    ],
    "fill-antialias": false,
    "fill-opacity": 0.9,
  },
};
export const areasFamine = {
  layerId: "areasFamine",
  type: "fill",
  "source-layer": "areas",
  layout: {},
  paint: {
    "fill-pattern": ["match", ["get", "overall_phase"], [6], "famine", ""],
  },
};

export const areasGroupFamine = {
  layerId: "areasGroupFamine",
  type: "fill",
  "source-layer": "groups",
  layout: {},
  paint: {
    "fill-pattern": ["match", ["get", "overall_phase"], [6], "famine", ""],
  },
};

export const urbanAreas = {
  layerId: "urbanAreas",
  type: "circle",
  "source-layer": "areas",
  layout: {},
  paint: {
    "circle-color": [
      "case",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 1],
      ],
      "#cef9ce",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 2],
      ],
      "#f9e43c",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 3],
      ],
      "#e4781f",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 4],
      ],
      "#c60813",
      [
        "all",
        ["==", ["get", "condition"], "A"],
        ["==", ["get", "overall_phase"], 5],
      ],
      "#640000",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 1],
      ],
      "rgb(204, 255, 204)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 2],
      ],
      "rgb(203, 201, 226)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 3],
      ],
      "rgb(158, 154, 200)",
      [
        "all",
        ["==", ["get", "condition"], "C"],
        ["==", ["get", "overall_phase"], 4],
      ],
      "rgb(106, 81, 163)",
      ["==", ["get", "overall_phase"], 9],
      "#a6a6a6",
      "hsl(0, 0%, 100%)",
    ],
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 2, 12, 20],
    "circle-opacity": 0.75,
    "circle-stroke-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#000000",
      "#ffffff",
    ],
    "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 3, 0, 12, 2],
  },
};

export const urbanAreasCenter = {
  layerId: "urbanAreasCenter",
  type: "circle",
  "source-layer": "areas",
  layout: {},
  paint: {
    "circle-color": "#000000",
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 1, 12, 8],
  },
};

export const idp = {
  layerId: "idp",
  type: "symbol",
  "source-layer": "areas",
  layout: {
    "icon-image": [
      "concat",
      "idp-camp",
      ["to-string", ["get", "overall_phase"]],
    ],
    "icon-size": ["interpolate", ["linear"], ["zoom"], 3, 0.15, 12, 2],
    "icon-ignore-placement": true,
    "icon-allow-overlap": true,
  },
  paint: {
    // 'icon-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0, 1],
  },
};

export const idpHover = {
  layerId: "idpHover",
  type: "symbol",
  "source-layer": "areas",
  layout: {
    "icon-image": [
      "concat",
      "hover-idp-camp",
      ["to-string", ["get", "overall_phase"]],
    ],
    "icon-size": ["interpolate", ["linear"], ["zoom"], 3, 0.15, 12, 2],
    "icon-ignore-placement": true,
    "icon-allow-overlap": true,
  },
  paint: {
    "icon-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0,
    ],
  },
};

export const areasBorder = {
  layerId: "areas-border",
  type: "line",
  "source-layer": "areas",
  layout: {},
  paint: {
    "line-color": "#ffffff",
    "line-width": [
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      4,
      0.05,
      8,
      2,
    ],
  },
};

export const areasGroupBorder = {
  layerId: "areas-group-border",
  type: "line",
  "source-layer": "groups",
  layout: {},
  paint: {
    "line-color": "#ffffff",
    "line-width": [
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      4,
      0.05,
      8,
      2,
    ],
  },
};

export const areasLabels = {
  layerId: "areas-label",
  type: "symbol",
  "source-layer": "areas",
  layout: {
    "text-field": ["to-string", ["get", "title"]],
    "text-font": ["Myriad Pro Regular", "Arial Unicode MS Regular"],
    "text-size": ["step", ["zoom"], 12, 8, 16],
    "symbol-avoid-edges": true,
    "text-variable-anchor": ["bottom-left", "center"],
  },
  paint: {
    "text-halo-color": "hsl(0, 0%, 100%)",
    "text-color": "hsl(0, 0%, 0%)",
    "text-halo-width": 1,
  },
};

export const bags = {
  layerId: "bags",
  type: "symbol",
  "source-layer": "icons",
  layout: {
    "icon-image": ["to-string", ["get", "icon"]],
    "icon-size": ["interpolate", ["linear"], ["zoom"], 3, 0.05, 8, 0.5],
    "icon-ignore-placement": true,
    "icon-allow-overlap": true,
  },
};
