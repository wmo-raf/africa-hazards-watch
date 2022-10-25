import { fetchTimestamps } from "services/timestamps";

import { GFS_PRECIPITABLE_WATER_TOTAL } from "data/layers";

const dataPath = "/gskydata/gfs/gfs-precipitable-water-total";

export default {
  layer: GFS_PRECIPITABLE_WATER_TOTAL,
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
