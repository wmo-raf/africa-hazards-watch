import { getLatestDates } from "services/live-imagery";

const layerId = "msg_fes:rgb_naturalenhncd";

export default {
  layer: "msg_fes:rgb_naturalenhncd",
  getTimestamps: () => {
    return getLatestDates({ layerId }).then((res) => {
      const timestamps = (res.data && res.data.values) || [];
      return timestamps;
    });
  },
  updateInterval: 900000, // every 15 minutes
};
