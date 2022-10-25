import { TROPICAL_CYCLONES_URL } from "utils/apis";
import request from "utils/request";

export const getStorms = () => {
  return request.get(TROPICAL_CYCLONES_URL).then((res) => res.data);
};
