import {
  gskyTimestampsRequest,
  synopTimestampsRequest,
  ecmwfSynopTimestampsRequest,
} from "utils/request";

export const fetchTimestamps = (dataPath) => {
  const url = `${dataPath}?timestamps`;
  return gskyTimestampsRequest.get(url);
};

export const fetchSynopTimestamps = (dataPath) => {
  const url = `${dataPath}`;
  return synopTimestampsRequest.get(url);
};

export const fetchEcwmfSynopTimestamps = () => {
  return ecmwfSynopTimestampsRequest.get();
};
