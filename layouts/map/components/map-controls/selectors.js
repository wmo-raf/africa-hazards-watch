import { createStructuredSelector } from "reselect";

import {
  getMapViewport,
  getActiveDatasetsFromState,
  getMapMinZoom,
  getMapMaxZoom,
  getBasemap,
} from "components/map/selectors";
import { getHidePanels, getShowBasemaps } from "layouts/map/selectors";

const getDatasetsLoading = (state) => state.datasets && state.datasets.loading;
const getMapTourOpen = (state) => state.mapTour && state.mapTour.open;
const getMetaModalOpen = (state) =>
  !!state.modalMeta?.metakey || state?.modalMeta?.closing;

export const getMapControlsProps = createStructuredSelector({
  datasetsLoading: getDatasetsLoading,
  hidePanels: getHidePanels,
  viewport: getMapViewport,
  datasets: getActiveDatasetsFromState,
  minZoom: getMapMinZoom,
  maxZoom: getMapMaxZoom,
  showBasemaps: getShowBasemaps,
  activeBasemap: getBasemap,
  mapTourOpen: getMapTourOpen,
  metaModalOpen: getMetaModalOpen,
});
