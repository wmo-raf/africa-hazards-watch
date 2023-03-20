import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

import { GFS_RELATIVE_HUMIDITY } from "data/layers";

const dataPath = "/gskydata/gfs/gfs-relative-humidity-2-m";

export default {
  layer: GFS_RELATIVE_HUMIDITY,
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
