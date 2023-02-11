import { connect } from "react-redux";
import reducerRegistry from "redux/registry";

import { setMapSettings } from "components/map/actions";
import { setMenuSettings } from "components/map-menu/actions";
import { setMainMapSettings } from "layouts/map/actions";

import {
  setMapPromptsSettings,
  setShowMapPrompts,
} from "components/prompts/map-prompts/actions";

import { selectShowMapPrompts } from "components/prompts/map-prompts/selectors";

import { POLITICAL_BOUNDARIES_DATASET } from "data/datasets";

import { POLITICAL_BOUNDARIES } from "data/layers";

import MapWelcomeImage1 from "assets/images/map-welcome-1.png";
import MapWelcomeImage2 from "assets/images/map-welcome-2.png";
import MapWelcomeImage3 from "assets/images/map-welcome-3.png";

import * as actions from "./actions";
import reducers, { initialState } from "./reducers";
import Component from "./component";

const welcomeCards = [
  {
    label: "Explore recent deforestation and fire alerts",
    thumbnail: MapWelcomeImage1,
    map: {
      datasets: [
        {
          dataset: POLITICAL_BOUNDARIES_DATASET,
          layers: [POLITICAL_BOUNDARIES],
          opacity: 1,
          visibility: true,
        },
      ],
      basemap: {
        value: "planet",
        // @planet We have to do this in a static fashion for now
        // An option would be to fetch the options on compilation time at a later stage
        name: "planet_medres_normalized_analytic_2021-05_mosaic",
        color: "",
      },
    },
    mainMap: {
      showAnalysis: false,
    },
  },
  {
    label: "Analyze historical trends in tree cover loss and gain since 2000",
    thumbnail: MapWelcomeImage2,
    map: {
      center: {
        lat: 27,
        lng: 12,
      },
      zoom: 2,
      datasets: [
        // admin boundaries
        {
          dataset: POLITICAL_BOUNDARIES_DATASET,
          layers: [POLITICAL_BOUNDARIES],
          opacity: 1,
          visibility: true,
        },
      ],
    },
    menu: {
      menuSection: "search",
      searchType: "location",
    },
    mainMap: {
      showAnalysis: false,
    },
  },
  {
    label: "Read the latest reporting on tropical forest loss",
    thumbnail: MapWelcomeImage3,
    map: {
      datasets: [
        {
          dataset: POLITICAL_BOUNDARIES_DATASET,
          layers: [POLITICAL_BOUNDARIES],
          opacity: 1,
          visibility: true,
        },
      ],
    },
    menu: {
      menuSection: "explore",
      exploreType: "placesToWatch",
    },
    mainMap: {
      showAnalysis: false,
    },
  },
];

const mapStateToProps = (state) => {
  const { open, hideModal } = state.modalWelcome || {};

  return {
    open,
    welcomeCards,
    showPrompts: selectShowMapPrompts(state),
    title: hideModal
      ? "Map How-To Guide"
      : "Welcome to new Hazards Watch map!",
    description: "What would you like to do?",
  };
};

reducerRegistry.registerModule("modalWelcome", {
  actions,
  reducers,
  initialState,
});

export default connect(mapStateToProps, {
  ...actions,
  setMapPromptsSettings,
  setShowMapPrompts,
  setMenuSettings,
  setMapSettings,
  setMainMapSettings,
})(Component);
