import { createStructuredSelector, createSelector } from "reselect";

import {
  getActiveDatasetsFromState,
  getLayerGroups,
  getActiveLayers,
  getComparing,
  getActiveCompareSide,
} from "components/map/selectors";

import layersIcon from "assets/icons/layers.svg?sprite";

const selectLatestLoading = (state) => state.latest && state.latest.loading;
const selectDatasetsLoading = (state) =>
  state.datasets && state.datasets.loading;
const selectCountryDataLoading = (state) =>
  state.countryData && state.countryData.loading;
const selectLayerTimestamps = (state) =>
  state.datasets && state.datasets.timestamps;

export const getLoading = createSelector(
  [selectLatestLoading, selectDatasetsLoading, selectCountryDataLoading],
  (latestLoading, datasetsLoading, countryDataLoading) =>
    latestLoading || datasetsLoading || countryDataLoading
);

const getLegendLayerGroups = createSelector([getLayerGroups], (groups) => {
  if (!groups) return null;

  const lGroups = groups.filter((g) => !g.isBoundary && !g.isRecentImagery);

  return lGroups.map((group) => {
    const layers =
      group.layers &&
      group.layers.map((l) => {
        if (l.dynamicLegendByParamConfig) {
          const params = l.params;

          for (const param in params) {
            if (l.dynamicLegendByParamConfig[param]) {
              const val = params[param];

              if (l.dynamicLegendByParamConfig[param][val]) {
                l.legendConfig = l.dynamicLegendByParamConfig[param][val];
                break;
              } else {
                l.legendConfig = {};
              }
            }
          }
        }

        return { ...l };
      });

    return { ...group, layers: layers };
  });
});

export const getLegendCompareLinks = createSelector(
  [getActiveCompareSide],
  (activeCompareSide) => [
    {
      label: "LEFT",
      icon: layersIcon,
      active: activeCompareSide === "left",
      mapSide: "left",
    },
    {
      label: "RIGHT",
      icon: layersIcon,
      active: activeCompareSide === "right",
      mapSide: "right",
    },
  ]
);

export const getLegendProps = createStructuredSelector({
  loading: getLoading,
  comparing: getComparing,
  layerGroups: getLegendLayerGroups,
  activeDatasets: getActiveDatasetsFromState,
  layerTimestamps: selectLayerTimestamps,
  activeLayers: getActiveLayers,
  compareLinks: getLegendCompareLinks,
  activeCompareSide: getActiveCompareSide,
});
