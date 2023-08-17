import { metadataRequest } from "utils/request";

export const getMetadata = (id) => metadataRequest.get(`/${id}`);

export default {
  getMetadata,
};
