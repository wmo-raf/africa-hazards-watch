import layersIcon from "assets/icons/layers.svg?sprite";
import globeIcon from "assets/icons/globe.svg?sprite";
import searchIcon from "assets/icons/search.svg?sprite";
import analysisIcon from "assets/icons/analysis.svg?sprite";
import alertsIcon from "assets/icons/alert.svg?sprite";
import myHWIcon from "assets/icons/myhw.svg?sprite";

import Analysis from "components/analysis";
import Legend from "components/map/components/legend";
import Datasets from "./components/sections/datasets";
import Alerts from "./components/sections/alerts";
import Search from "./components/sections/search";
import MyHW from "components/map-menu/components/sections/my-hw";

export const mobileSections = [
  {
    label: "layers",
    slug: "datasets",
    icon: globeIcon,
    Component: Datasets,
  },
  {
    label: "legend",
    slug: "legend",
    icon: layersIcon,
    Component: Legend,
    embed: true,
  },
  {
    label: "analysis",
    slug: "analysis",
    icon: analysisIcon,
    Component: Analysis,
    embed: true,
  },
  {
    label: "alerts",
    slug: "alerts",
    icon: alertsIcon,
    Component: Alerts,
  },
  {
    label: "my HW",
    slug: "my-hw",
    icon: myHWIcon,
    Component: MyHW,
  },
];

export const upperSections = [
  {
    label: "alerts",
    slug: "alerts",
    icon: alertsIcon,
    Component: Alerts,
  },
];

export const searchSections = [
  {
    label: "search",
    slug: "search",
    icon: searchIcon,
    Component: Search,
    large: true,
  },
  {
    label: "my HW",
    slug: "my-hw",
    icon: myHWIcon,
    Component: MyHW,
  },
];
