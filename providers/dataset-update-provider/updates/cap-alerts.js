import { getAlerts } from "services/cap-alerts";

export default {
  layer: "cap_alerts",
  getData: (token) => {
    return getAlerts();
  },
  updateInterval: 1000 * 60 * 5, // every 5 minutes
};
