import { getLatestDates } from "services/live-imagery";

const layerId = "msg_fes:h60b";

export default {
  layer: layerId,
  getTimestamps: () => {
    return getLatestDates({ layerId }).then((res) => {
      const timestamps = (res.data && res.data.values) || [];
      return timestamps;
    });
  },
  updateInterval: 900000, // every 15 minutes
};
