import { getAlerts } from "services/cap-alerts";

export default {
  layer: "cap_alerts",
  getData: async (token) => {
    const timestamp = new Date().getTime();

    return `http://20.56.94.119/api/cap-alerts/?timestamp=${timestamp}`;
  },
  updateInterval: 1000 * 60 * 5, // every 5 minutes
  // updateInterval: 1000 * 6, // every 5 minutes
  zoomToDataExtent: false,
};
