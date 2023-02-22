import { CAP_ALERTS_URL } from "utils/apis";
import request, { apiRequest } from "utils/request";

export const getAlerts = () => {
  return request.get(CAP_ALERTS_URL).then((res) => res.data);
};

export const getAlertDetail = (capUrl) => {
  return apiRequest.get(`/cap-alerts/detail?capUrl=${capUrl}`).then((res) => {
    return res.data;
  });
};
