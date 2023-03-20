import alerts from "./alerts";
import weatherUpdates from "./weather";
import environmentUpdates from "./environment";

export default [...alerts, ...weatherUpdates, ...environmentUpdates];
