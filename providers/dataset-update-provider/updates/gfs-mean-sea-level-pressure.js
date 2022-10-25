import { fetchTimestamps } from "services/timestamps";

import { GFS_MEAN_SEA_LEVEL_PRESSURE } from "data/layers";

const dataPath = "/gskydata/gfs/gfs-mean-sea-level-pressure";

export default {
  layer: GFS_MEAN_SEA_LEVEL_PRESSURE,
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
