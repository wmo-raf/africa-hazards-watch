import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

import { DUST_SURFACE_CONCENTRATION_FORECAST } from "data/layers";

const dataPath = "/gskydata/dust-forecast/sconc_dust";

export default {
  layer: DUST_SURFACE_CONCENTRATION_FORECAST,
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
