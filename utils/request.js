import { CancelToken, create } from "axios";

import { HW_API, HW_CMS_API, PG_FEATURESERV_URL } from "utils/apis";

const isServer = typeof window === "undefined";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const TIMEOUT = 50 * 1000;

export const apiRequest = create({
  timeout: TIMEOUT,
  baseURL: HW_API,
});

export const apiAuthRequest = create({
  timeout: TIMEOUT,
  baseURL: HW_API,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${!isServer && localStorage.getItem("userToken")}`,
  },
});

export const cmsApiRequest = create({
  timeout: TIMEOUT,
  baseURL: HW_CMS_API,
});

export const nominatimGeocodingRequest = create({
  timeout: TIMEOUT,
  baseURL: "https://nominatim.openstreetmap.org",
});

export const pgFeatureServRequest = create({
  timeout: TIMEOUT,
  baseURL: PG_FEATURESERV_URL,
  transformResponse: [
    (resp) => {
      const data = JSON.parse(resp);
      if (data && data.features) {
        return { rows: data.features.map((f) => ({ ...f.properties })) };
      }
      return data;
    },
  ],
});

export const cancelToken = () => CancelToken.source();

export default create({
  timeout: TIMEOUT,
});

export const gskyTimestampsRequest = create({
  timeout: TIMEOUT,
  baseURL: "http://197.254.13.228:8081/mas",
});

export const synopTimestampsRequest = create({
  headers: {
    "content-type": "application/json",
  },
  timeout: TIMEOUT,
  // baseURL: "http://197.254.13.228:9001/met_api/date_ls", // TODO : ENABLE IN PRODUCTION
  baseURL: "http://localhost:9000/date_ls", // TODO : SET TO PRODUCTION
});
