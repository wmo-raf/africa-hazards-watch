import { fetchTimestamps } from "services/timestamps";

import { GFS_PRECIPITATION_FORECAST } from "data/layers";

const dataPath = "/gskydata/tera/gfs-precipitation-1-hr";

export default {
  layer: GFS_PRECIPITATION_FORECAST,
  getTimestamps: (params = {}, token) => {
    return fetchTimestamps(dataPath).then((res) => {
      const timestamps = (res.data && res.data.timestamps) || [];
      return timestamps;
    });
  },
  // updateInterval: 3.6e6,
};
