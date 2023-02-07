import { fetchSynopTimestamps } from "services/timestamps";

import { OBS_SYNOPTIC_CHARTS } from "data/layers";

const dataPath = "/air_temperature";

export default {
  layer: OBS_SYNOPTIC_CHARTS,
  getTimestamps: (params = {}, token) => {
    return fetchSynopTimestamps(dataPath).then((res) => {
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
