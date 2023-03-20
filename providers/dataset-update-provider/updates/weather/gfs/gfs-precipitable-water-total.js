import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

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
    const nextDate = getNextDate(timestamps);

    if (nextDate) {
      return nextDate;
    }

    return timestamps[timestamps.length - 1];
  },
  updateInterval: 300000, // 5 minutes
};
