import { getAlerts } from "services/cap-alerts";

export default {
  layer: "cap_alerts",
  getData: async (token) => {
    const timestamp = new Date().getTime();

    return `http://127.0.0.1:3200/api/v1/alerts?timestamp=${timestamp}`;
  },
  updateInterval: 1000 * 60 * 5, // every 5 minutes
  // updateInterval: 1000 * 6, // every 5 minutes
  zoomToDataExtent: false,
};
