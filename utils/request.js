import { CancelToken, create } from "axios";

import {
  HW_API,
  HW_CMS_API,
  PG_FEATURESERV_URL,
  ECWMF_HRES_TIMESTAMPS_URL,
  METADATA_BASE_URL,
} from "utils/apis";

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

export const metadataRequest = create({
  timeout: TIMEOUT,
  baseURL: METADATA_BASE_URL,
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
  baseURL: "http://20.56.94.119/gsky/mas",
});

export const synopTimestampsRequest = create({
  headers: {
    "content-type": "application/json",
  },
  timeout: TIMEOUT,
  baseURL: "http://20.56.94.119/gts-data/met_web/date_ls", // TODO : ENABLE IN PRODUCTION
  // baseURL: "http://localhost:9001/met_web/date_ls", // TODO : SET TO PRODUCTION
});

export const myDataRequest = create({
  timeout: TIMEOUT,
  baseURL: `${HW_API}/my-data`,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${!isServer && localStorage.getItem("userToken")}`,
  },
});

export const ecmwfSynopTimestampsRequest = create({
  headers: {
    "content-type": "application/json",
  },
  timeout: TIMEOUT,
  baseURL: "http://20.56.94.119/api/ecmwf-obs/dates",
});

export const ecmwfHresTimestampsRequest = create({
  headers: {
    "content-type": "application/json",
  },
  timeout: TIMEOUT,
  baseURL: ECWMF_HRES_TIMESTAMPS_URL,
});
