import { getLatestDates } from "services/live-imagery";

const layerId = "msg_iodc:mpe";

export default {
  layer: "msg_iodc:mpe",
  getTimestamps: () => {
    return getLatestDates({ layerId }).then((res) => {
      const timestamps = (res.data && res.data.values) || [];
      return timestamps;
    });
  },
  updateInterval: 900000, // every 15 minutes
};
