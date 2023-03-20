import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

import { GFS_WIND_SPEED } from "data/layers";

const dataPath = "/gskydata/gfs/gfs-wind-speed-10-m";

export default {
  layer: GFS_WIND_SPEED,
  getTimestamps: (params = {}, token) => {
    return fetchTimestamps(dataPath).then((res) => {
      const timestamps = (res.data && res.data.timestamps) || [];

      return timestamps;
    });
  },
  getCurrentLayerTime: (timestamps) => {
    const nextDate = getNextDate(timestamps);

    if (nextDate) {
      return nextDate;
    }

    return timestamps[timestamps.length - 1];
  },
  updateInterval: 300000, // 5 minutes
};
