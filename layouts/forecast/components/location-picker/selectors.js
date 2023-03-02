import isEmpty from "lodash/isEmpty";
import { createSelector, createStructuredSelector } from "reselect";

// get list data
export const selectLocation = (state) =>
  state.location && state.location.payload;

export const selectLoading = (state) =>
  state.countryData &&
  state.geostore &&
  (state.geostore.loading ||
    state.countryData.isCountriesLoading ||
    state.countryData.isRegionsLoading ||
    state.countryData.isSubRegionsLoading);
export const selectCountryData = (state) =>
  state.countryData && {
    adm0: state.countryData.countries,
    adm1: state.countryData.regions,
    adm2: state.countryData.subRegions,
  };

const selectDatasets = (state) => state.datasets.data;

export const getBoundariesLayer = createSelector(
  [selectDatasets],
  (datasets) => {
    if (isEmpty(datasets)) return null;

    const boundariesDataset = datasets.find(
      (d) => d.id === "political-boundaries" && d.isBoundary
    );

    if (!boundariesDataset) {
      return null;
    }

    return boundariesDataset.layers[0];
  }
);

export const getAdminMetadata = createSelector(
  [selectCountryData],
  (countries) => {
    return countries;
  }
);

export const getAdm0Data = createSelector(
  [getAdminMetadata],
  (data) => data && data.adm0
);

export const getAdm1Data = createSelector(
  [getAdminMetadata],
  (data) => data && data.adm1
);

export const getAdm2Data = createSelector(
  [getAdminMetadata],
  (data) => data && data.adm2
);

export const getAdminsSelected = createSelector(
  [getAdm0Data, getAdm1Data, getAdm2Data, selectLocation],
  (adm0s, adm1s, adm2s, location) => {
    const adm0 =
      (location &&
        location.adm0 &&
        adm0s &&
        adm0s.find(
          (i) => i.value === location.adm0 || i.subscriptionId === location.adm0
        )) ||
      null;
    const adm1 =
      (location &&
        location.adm1 &&
        adm1s &&
        adm1s.find((i) => i.value === location.adm1)) ||
      null;
    const adm2 =
      (location &&
        location.adm2 &&
        adm2s &&
        adm2s.find((i) => i.value === location.adm2)) ||
      null;
    let current = adm0;
    if (location?.adm2) {
      current = adm2;
    } else if (location?.adm1) {
      current = adm1;
    }

    return {
      ...current,
      adm0,
      adm1,
      adm2,
    };
  }
);

export const getSelectorMeta = createSelector([selectLocation], (location) => {
  const { type } = location || {};

  return {
    typeVerb: type,
    typeName: type,
  };
});

export const getPickerProps = createStructuredSelector({
  loading: selectLoading,
  location: selectLocation,
  adm0s: getAdm0Data,
  adm1s: getAdm1Data,
  adm2s: getAdm2Data,
  locationNames: getAdminsSelected,
  selectorMeta: getSelectorMeta,
  boundariesLayer: getBoundariesLayer,
});
