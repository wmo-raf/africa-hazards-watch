import { getLatestDates } from "services/live-imagery";

const layerId = "mumi:worldcloudmap_ir108";

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
