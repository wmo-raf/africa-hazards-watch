import request from "utils/request";

import { EAHW_CMS_API } from "utils/apis";

export const getApiDatasets = () =>
  request.get(`${EAHW_CMS_API}/datasets/`).then((res) => res?.data);

export const getLayerById = (layerId) =>
  request.get(`${EAHW_CMS_API}/layers/${layerId}`);
