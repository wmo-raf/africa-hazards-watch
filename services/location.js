import lowerCase from "lodash/lowerCase";
import startCase from "lodash/startCase";

import { pgFeatureServRequest } from "utils/request";
import { getGeodescriberByGeostore } from "services/geodescriber";
import { getArea } from "services/areas";

export const countryConfig = {
  adm0: (params) =>
    pgFeatureServRequest(
      `/functions/postgisftw.africa_countries_list/items.json?country_iso=${params.adm0}`
    ).then((response) => {
      const { name, ...props } = response?.data?.[0];

      return {
        locationName: name,
        ...props,
        name: name,
      };
    }),
  adm1: (params) =>
    pgFeatureServRequest(
      `/functions/postgisftw.africa_adm1_by_id/items.json?adm1_id=${params.adm0}.${params.adm1}_1`
    ).then((response) => {
      const { id, name_1, name_0, ...props } = response?.data?.[0];

      return {
        locationName: `${name_1}, ${name_0}`,
        ...props,
        id: id,
        adm0: name_0,
        adm1: name_1,
      };
    }),
  adm2: (params) =>
    pgFeatureServRequest(
      `/functions/postgisftw.africa_adm2_by_id/items.json?adm2_id=${params.adm0}.${params.adm1}.${params.adm2}_1`
    ).then((response) => {
      const { name_2, name_1, name_0, ...props } = response?.data?.[0];

      return {
        locationName: `${name_2}, ${name_1}, ${name_0}`,
        ...props,
        adm0: name_0,
        adm1: name_1,
        adm2: name_2,
      };
    }),
};

export const geostoreConfig = {
  adm0: (params) =>
    getGeodescriberByGeostore({ geostore: params.adm0 }).then((response) => {
      const { title, ...props } = response?.data?.data;

      return {
        locationName: title || "Area",
        ...props,
      };
    }),
};

export const useConfig = {
  adm1: (params) => ({
    locationName: `${params.adm1}, ${startCase(lowerCase(params.adm0))}`,
  }),
};

export const aoiConfig = {
  adm0: (params, userToken = null) =>
    getArea(params.adm0, userToken).then((area) => {
      const { name, ...props } = area;

      if (name) {
        return {
          locationName: name,
          ...props,
        };
      }
      const { admin, iso, use, wdpaid } = props || {};

      if ((admin && admin.adm0) || (iso && iso.country)) {
        const locationParams = {
          adm0: iso.country || admin.adm0,
          adm1: iso.region || admin.adm1,
          adm2: iso.subRegion || admin.adm2,
        };
        if (locationParams.adm2) return countryConfig.adm2(locationParams);
        if (locationParams.adm1) return countryConfig.adm1(locationParams);
        if (locationParams.adm0) return countryConfig.adm0(locationParams);
      } else if (use && use.id) {
        return useConfig.adm1({ adm0: use.name, adm1: use.id });
      } else if (wdpaid) {
        return wdpaConfig.adm0({ adm0: wdpaid });
      }

      return getGeodescriberByGeostore(area).then((response) => {
        const geodescriber = response?.data?.data;

        return {
          locationName: geodescriber.title || "Area of Interest",
          geodescriber,
          ...props,
        };
      });
    }),
};

export const config = {
  country: countryConfig,
  geostore: geostoreConfig,
  aoi: aoiConfig,
  use: useConfig,
};

export const getLocationData = async (params, userToken = null) => {
  const location = {
    type: params?.[0],
    adm0: params?.[1],
    adm1: params?.[2],
    adm2: params?.[3],
  };

  let getLocationDataFunc = () => {};
  if (location.adm2) getLocationDataFunc = config[location.type].adm2;
  else if (location.adm1) getLocationDataFunc = config[location.type].adm1;
  else if (location.adm0) getLocationDataFunc = config[location.type].adm0;

  const locationData = await getLocationDataFunc(location, userToken);

  return locationData;
};
