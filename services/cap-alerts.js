import { CAP_ALERTS_URL } from "utils/apis";
import request from "utils/request";

export const getAlerts = () => {
  return request.get(CAP_ALERTS_URL).then((res) => res.data);
};
