import { createStructuredSelector, createSelector } from "reselect";

import {
  getActiveSection,
  getSelectedCountry,
} from "components/map-menu/selectors";

import config from "./config";

export const getCountyConfig = createSelector(
  [getSelectedCountry],
  (selectedCountry) => {
    if (!selectedCountry) return null;

    const countryConfig = config.find((c) => c.iso === selectedCountry);

    return countryConfig;
  }
);

export const getProps = createStructuredSelector({
  menuSection: getActiveSection,
  countryConfig: getCountyConfig,
});
