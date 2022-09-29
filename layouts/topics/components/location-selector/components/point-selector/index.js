import { connect } from "react-redux";
import Component from "./components";

import { setSelectedPlaceName } from "layouts/topics/climate-change/actions";
import { getSelectorProps } from "./selectors";

const actions = {
  setSelectedPlaceName,
};

export default connect(getSelectorProps, actions)(Component);
