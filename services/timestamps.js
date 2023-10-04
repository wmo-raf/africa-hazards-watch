import request, {
  gskyTimestampsRequest,
  synopTimestampsRequest,
  ecmwfSynopTimestampsRequest,
  ecmwfHresTimestampsRequest,
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

export const fetchEcwmfHresTimestamps = (layer) => {
  const url = `${layer}/`;
  return ecmwfHresTimestampsRequest.get(url);
};

export const fetchTileJsonTimestamps = (tileJsonUrl) => {
  return request.get(tileJsonUrl);
};
