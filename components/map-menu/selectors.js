import { createSelector, createStructuredSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
import startCase from "lodash/startCase";
import flatten from "lodash/flatten";

import {
  getActiveDatasetsFromState,
  getLayerGroups,
  getMapZoom,
  getActiveCompareSide,
  getComparing,
  selectGeostore,
} from "components/map/selectors";

import { getEmbed } from "layouts/map/selectors";

import { searchSections, mobileSections, upperSections } from "./sections";
import Datasets from "./components/sections/datasets";
import icons from "./icons";
import ACTIVE_COUNTRIES_ISO from "./countries";

const getMenuSettings = (state) => state.mapMenu?.settings || {};
const getCountries = (state) =>
  state.countryData && state.countryData.countries;
const getLoading = (state) =>
  (state.datasets && state.datasets.loading) ||
  (state.countryData && state.countryData.loading);
const getAnalysisLoading = (state) => state.analysis && state.analysis.loading;
const getDatasets = (state) => state.datasets && state.datasets.data;
const getLocation = (state) => state.location && state.location.payload;
const getApiSections = (state) => (state.sections && state.sections.data) || [];
const getSectionSettings = (state) =>
  (state.sections && state.sections.settings) || [];
const selectClipToGeostore = (state) => state.map?.settings?.clipToGeostore;
export const selectmapLocationGeostore = (state) =>
  state.geostore && state.geostore.mapLocationGeostore;
const selectLoggedIn = (state) => state.myHw?.data?.loggedIn;

export const getMenuSection = createSelector(
  [getMenuSettings],
  (settings) => settings.menuSection
);

export const getActiveCountries = createSelector(
  [getCountries],
  (countries) => {
    if (isEmpty(countries)) return [];

    return countries.filter((c) => ACTIVE_COUNTRIES_ISO.includes(c.value));
  }
);

export const getSelectedCountry = createSelector(
  [getMenuSettings],
  (settings) => settings.mapLocationContext
);

export const getSubCategoryGroupsSelected = createSelector(
  [getMenuSettings],
  (settings) => settings.subCategoryGroupsSelected
);

export const getDatasetCategory = createSelector(
  [getMenuSettings],
  (settings) => settings.datasetCategory
);

export const getSearch = createSelector(
  [getMenuSettings],
  (settings) => settings.search
);

export const getSearchType = createSelector(
  [getMenuSettings],
  (settings) => settings.searchType
);

export const getExploreType = createSelector(
  [getMenuSettings],
  (settings) => settings.exploreType
);

export const getPTWType = createSelector(
  [getMenuSettings],
  (settings) => settings.ptwType
);

// get countries by datasets
export const getAvailableCountries = createSelector(
  [getCountries],
  (countries) => {
    return countries;
  }
);

// build datasets with available countries data
export const getDatasetSections = createSelector(
  [getApiSections, getDatasets, getSelectedCountry],
  (apiSections, datasets, selectedCountry) => {
    const sections = apiSections.map((section) => ({
      ...section,
      icon: icons[section.icon] ? icons[section.icon] : icons.defaultIcon,
      Component: Datasets,
    }));

    if (isEmpty(datasets)) return sections;

    // loop thru each section
    return (
      sections &&
      sections.map((s) => {
        // get the section id (category) and the subcategories under the section e.g (rainfall) and
        // (rainfallForecast, extremeRainfall)
        const { id, subCategories } = s;

        // get all datasets that belong to this specific section e.g datasets under rainfall.
        // datasets with no matching category will not appear henceforth
        const sectionDatasets =
          datasets && datasets.filter((d) => d.category === id);

        let subCategoriesWithDatasets = [];

        if (subCategories) {
          // loop thru each subcategory
          subCategoriesWithDatasets = subCategories.map((subCat) => ({
            ...subCat,
            // get datasets that have this subcategory's slug (id).
            // This filters subcategories to ensure we only show subcategories that actually have data.
            // Datasets with no matching subcategory slug will not appear henceforth
            datasets:
              sectionDatasets &&
              sectionDatasets.filter((d) => d.sub_category === subCat.id),
          }));
        }

        return {
          ...s,
          datasets: sectionDatasets,
          subCategories: subCategoriesWithDatasets,
        };
      })
    );
  }
);

export const getDatasetSectionsWithData = createSelector(
  [
    getDatasetSections,
    getActiveDatasetsFromState,
    getDatasetCategory,
    getMenuSection,
    getSectionSettings,
  ],
  (sections, activeDatasets, datasetCategory, menuSection, sectionSettings) => {
    if (!activeDatasets) return sections;
    const datasetIds = activeDatasets.map((d) => d.dataset);

    return (
      (sections &&
        sections.length &&
        sections.map((s) => {
          const { datasets, subCategories } = s;

          return {
            ...s,
            active: datasetCategory === s.category && menuSection === s.slug,
            layerCount:
              datasets &&
              datasets.filter(
                (d) => activeDatasets && datasetIds.includes(d.id)
              ).length,
            datasets:
              datasets &&
              datasets.map((d) => ({
                ...d,
                active: datasetIds.includes(d.id),
              })),
            subCategories:
              subCategories &&
              subCategories.map((subCat) => ({
                ...subCat,
                datasets:
                  subCat.datasets &&
                  subCat.datasets.map((d) => ({
                    ...d,
                    active: datasetIds.includes(d.id),
                  })),
              })),
          };
        })) ||
      []
    );
  }
);

export const getAllSections = createSelector(
  [getDatasetSectionsWithData],
  (datasetSections) => {
    if (!datasetSections) return null;

    return datasetSections
      .concat(upperSections)
      .concat(searchSections)
      .concat(mobileSections);
  }
);

export const getActiveSection = createSelector(
  [getAllSections, getMenuSection, getDatasetCategory],
  (sections, menuSection, datasetCategory) => {
    if (!sections || !menuSection) return null;

    return sections.find((s) =>
      s.category
        ? s.category === datasetCategory && s.slug === menuSection
        : s.slug === menuSection
    );
  }
);

export const getActiveSectionWithData = createSelector(
  [getActiveSection],
  (section) => {
    if (!section) return null;
    const subCatsWithData =
      section.subCategories &&
      section.subCategories.filter((s) => !isEmpty(s.datasets));

    return {
      ...section,
      ...(!isEmpty(subCatsWithData) && {
        subCategories: subCatsWithData,
      }),
    };
  }
);

export const getZeroDataCountries = createSelector(
  [getActiveSection],
  (section) => {
    if (!section) return null;
    const noDataCountries =
      section.subCategories &&
      section.subCategories.filter((s) => isEmpty(s.datasets));
    return noDataCountries ? noDataCountries.map((s) => s.title) : null;
  }
);

export const getUpperSections = createSelector(
  [getMenuSection],
  (menuSection) =>
    upperSections.map((s) => ({
      ...s,
      active: menuSection === s.slug,
    }))
);

export const getSearchSections = createSelector(
  [getMenuSection],
  (menuSection) =>
    searchSections.map((s) => ({
      ...s,
      active: menuSection === s.slug,
    }))
);

const getLegendLayerGroups = createSelector([getLayerGroups], (groups) => {
  if (!groups) return null;
  return groups.filter(
    (g) => !g.isBoundary && !g.isRecentImagery && !g.isLiveImagery
  );
});

export const getMobileSections = createSelector(
  [getMenuSection, getLegendLayerGroups, getLocation, getEmbed],
  (menuSection, activeDatasets, location, embed) =>
    mobileSections
      .filter((s) => !embed || s.embed)
      .map((s) => ({
        ...s,
        ...(s.slug === "datasets" && {
          layerCount: activeDatasets && activeDatasets.length,
        }),
        ...(s.slug === "analysis" && {
          highlight: location && !!location.type && !!location.adm0,
        }),
        active: menuSection === s.slug,
      }))
);

export const getDatasetCategories = createSelector(
  [getDatasetSectionsWithData],
  (datasets) =>
    datasets &&
    datasets.map((s) => ({
      ...s,
      label: startCase(s.category),
    }))
);

export const getAlertDataset = createSelector(
  [getDatasets, getActiveDatasetsFromState],
  (datasets, activeDatasets) => {
    const activeDatasetIds = activeDatasets.map((d) => d.dataset);

    // get CAP alert dataset
    const alertDataset = (datasets && datasets.find((d) => d.isCapAlert)) || {};

    // new dataset to prevent state mutation error
    const alertDs = { ...alertDataset };

    if (isEmpty(alertDs)) {
      return null;
    }

    alertDs.active = activeDatasetIds.includes(alertDs.id);

    return alertDs;
  }
);

export const getMenuProps = createStructuredSelector({
  upperSections: getUpperSections,
  datasetSections: getDatasetSectionsWithData,
  searchSections: getSearchSections,
  mobileSections: getMobileSections,
  activeSection: getActiveSectionWithData,
  menuSection: getMenuSection,
  countriesWithoutData: getZeroDataCountries,
  countries: getActiveCountries,
  selectedCountry: getSelectedCountry,
  activeDatasets: getActiveDatasetsFromState,
  datasetCategory: getDatasetCategory,
  datasetCategories: getDatasetCategories,
  exploreType: getExploreType,
  ptwType: getPTWType,
  search: getSearch,
  searchType: getSearchType,
  location: getLocation,
  loading: getLoading,
  analysisLoading: getAnalysisLoading,
  zoom: getMapZoom,
  alertDataset: getAlertDataset,
  comparing: getComparing,
  activeCompareSide: getActiveCompareSide,
  clipToGeostore: selectClipToGeostore,
  geostore: selectGeostore,
  mapLocationGeostore: selectmapLocationGeostore,
  allDatasets: getDatasets,
  subCategoryGroupsSelected: getSubCategoryGroupsSelected,
  loggedIn: selectLoggedIn,
});
