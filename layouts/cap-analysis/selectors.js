import { createStructuredSelector, createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";

import turfBbox from "turf-bbox";

const selectCapUrl = (state) =>
  state.location && state.location.query && state.location.query.capUrl;
const selectCapSection = (state) =>
  state.location && state.location.query && state.location.query.section;
const selectLoading = (state) => state.cap && state.cap.loading;
const selectAlert = (state) => state.cap && state.cap.alert;

export const getAlert = createSelector([selectAlert], (alertData) => {
  if (isEmpty(alertData) || isEmpty(alertData.alert)) return null;

  return alertData.alert;
});

export const getAlertSeverityColor = createSelector([getAlert], (alert) => {
  if (isEmpty(alert) || isEmpty(alert.info)) return null;

  const {
    info: { severity },
  } = alert;

  if (!severity) {
    return null;
  }

  switch (severity.toLowerCase()) {
    case "extreme":
      return "#d72f2a";
    case "severe":
      return "#fe9900";
    case "moderate":
      return "#ffff00";
    case "minor":
      return "#03ffff";
    default:
      return "#3366ff";
  }
});

export const getFeatureCollection = createSelector([getAlert], (alert) => {
  if (isEmpty(alert)) return null;

  const { area } = alert.info;

  if (isEmpty(area) || isEmpty(area.features)) return null;

  return area;
});

export const getFeatures = createSelector(
  [getFeatureCollection],
  (featureCollection) => {
    if (isEmpty(featureCollection) || isEmpty(featureCollection.features))
      return null;

    return featureCollection.features;
  }
);

export const getAletAreasBbox = createSelector(
  [getFeatureCollection],
  (featureCollection) => {
    if (isEmpty(featureCollection) || isEmpty(featureCollection.features))
      return null;

    const bbox = turfBbox(featureCollection);

    return bbox;
  }
);

export const getCapProps = createStructuredSelector({
  capUrl: selectCapUrl,
  loading: selectLoading,
  alert: getAlert,
  alertBbox: getAletAreasBbox,
  alertGeojson: getFeatureCollection,
  severityColor: getAlertSeverityColor,
  activeSection: selectCapSection,
});
