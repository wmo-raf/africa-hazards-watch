import { fetchTimestamps } from "services/timestamps";

import { GFS_PRECIPITATION_FORECAST } from "data/layers";

const dataPath = "/gskydata/gfs/gfs-precipitation-1-hr";

export default {
  layer: GFS_PRECIPITATION_FORECAST,
  getTimestamps: (params = {}, token) => {
    return fetchTimestamps(dataPath).then((res) => {
      const timestamps = (res.data && res.data.timestamps) || [];

      return timestamps;
    });
  },
  getCurrentLayerTime: (timestamps) => {
    const now = new Date().setMinutes(0, 0, 0);

    const nowDate = new Date(now).toISOString();

    const hasDate = timestamps.includes(nowDate);

    if (hasDate) {
      return nowDate;
    }

    return timestamps[timestamps.length - 1];
  },
  updateInterval: 300000, // 5 minutes
};
