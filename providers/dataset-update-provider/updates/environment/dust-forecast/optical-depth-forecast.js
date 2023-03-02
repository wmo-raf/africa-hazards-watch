import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

import { DUST_OPTICAL_DEPTH_FORECAST } from "data/layers";

const dataPath = "/gskydata/dust-forecast/od550_dust";

export default {
  layer: DUST_OPTICAL_DEPTH_FORECAST,
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