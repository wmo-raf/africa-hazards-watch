import { apiRequest } from "utils/request";

export const getAreaIntersectAnalysis = (layer, payload) => {
  return apiRequest
    .post(`/area-analysis/area/intersect/?layer=${layer}`, payload)
    .then((res) => {
      return res.data;
    });
};
