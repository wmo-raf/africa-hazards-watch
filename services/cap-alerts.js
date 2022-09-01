import request from "utils/request";

const ALERTS_ENDPOINT = "http://localhost:3200/api/v1/alerts";

export const getAlerts = () => {
  return request.get(ALERTS_ENDPOINT).then((res) => res.data);
};
