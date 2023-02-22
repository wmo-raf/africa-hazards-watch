import { createStructuredSelector, createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

const selectCapUrl = (state) =>
  state.location && state.location.query && state.location.query.capUrl;
const selectLoading = (state) => state.cap && state.cap.loading;
const selectAlert = (state) => state.cap && state.cap.alert;
const selectGeostoreData = (state) => state.cap && state.cap.geostore.data;
const selectAnalysisData = (state) => state.cap && state.cap.analysis.data;
const selectGeostoreLoading = (state) =>
  state.cap && state.cap.geostore.loading;
const selectAnalysisLoading = (state) =>
  state.cap && state.cap.analysis.loading;

export const getFeatures = createSelector([selectAlert], (alertData) => {
  if (isEmpty(alertData)) return null;

  const { area } = alertData.alert.info;
  if (!area || !!area.features.legth) return null;

  return area.features;
});

export const getFeatureIds = createSelector([getFeatures], (features) => {
  if (isEmpty(features)) return null;

  const featureIds = [];

  features.forEach((feature) => {
    if (feature.id) {
      featureIds.push(feature.id);
    }
  });

  return featureIds;
});

export const getFeatureLayers = createSelector([getFeatures], (features) => {
  if (isEmpty(features)) return null;

  const featureLayers = {};

  features.forEach((feature) => {
    if (feature.id) {
      const layer = { id: `area-${feature.id}`, data: feature };
      featureLayers[feature.id] = layer;
    }
  });

  return featureLayers;
});

export const getPopulationLayers = createSelector(
  [getFeatures, selectGeostoreData],
  (features, geostoreData) => {
    if (isEmpty(features) || isEmpty(geostoreData)) return null;

    const populationLayers = {};

    features.forEach((feature) => {
      if (feature.id && geostoreData[feature.id]) {
        const geostoreId = geostoreData[feature.id].geostoreId;

        populationLayers[feature.id] = geostoreId;
      }
    });

    return populationLayers;
  }
);

export const getAnalysisLayers = createSelector(
  [getFeatureIds, selectAnalysisData],
  (featureIds, analysisData) => {
    if (isEmpty(featureIds) || isEmpty(analysisData)) return null;

    const analysisLayers = {};

    featureIds.forEach((featId) => {
      if (analysisData[featId]) {
        Object.keys(analysisData[featId]).map((analysisType) => {
          analysisLayers[analysisType] = analysisData[featId][analysisType];
        });
      }
    });

    return analysisLayers;
  }
);

export const getAlertsDetail = createSelector(
  [getFeatures, getFeatureLayers, getPopulationLayers, getAnalysisLayers],
  (features, featureLayers, populationLayers, analysisLayers) => {
    if (
      isEmpty(features) ||
      isEmpty(featureLayers) ||
      isEmpty(populationLayers) ||
      isEmpty(analysisLayers)
    )
      return null;

    const details = [];

    features.forEach((feature) => {
      const featId = feature.id;
      details.push({
        featureId: featId,
        areaDesc: feature.properties.areaDesc,
        layers: {
          population: populationLayers[featId],
          alertArea: featureLayers[featId],
          ...analysisLayers,
        },
      });
    });

    return details;
  }
);

export const getCapProps = createStructuredSelector({
  capUrl: selectCapUrl,
  loading: selectLoading,
  geostoreLoading: selectGeostoreLoading,
  analysisLoading: selectAnalysisLoading,
  alertsDetail: getAlertsDetail,
});
