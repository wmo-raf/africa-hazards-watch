import { fetchTimestamps } from "services/timestamps";
import { getNextDate } from "utils/time";

import { ECMWF_WIND_DIVERGENCE } from "data/layers";

const dataPath = "/gskydata/ecmwf-forecast/oper_fc_divergence_pl_1000";

export default {
  layer: ECMWF_WIND_DIVERGENCE,
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
