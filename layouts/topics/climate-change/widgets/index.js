import WidgetsComponent from "./component";

import { connect } from "react-redux";
import { getWidgetProps } from "./selectors";
import {
  setSelectedPlaceName,
  setClimateChangeData,
  setClimateChangeDataLoading,
} from "../actions";

const actions = {
  setSelectedPlaceName,
  setClimateChangeData,
  setClimateChangeDataLoading,
};

export default connect(getWidgetProps, actions)(WidgetsComponent);
