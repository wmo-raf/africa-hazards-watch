import { gskyTimestampsRequest } from "utils/request";

export const fetchTimestamps = (dataPath) => {
  const url = `${dataPath}?timestamps&until=2030-01-01`;
  return gskyTimestampsRequest.get(url);
};
