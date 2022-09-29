import { connect } from "react-redux";

import { getLocationSelectorProps } from "./selectors";
import Component from "./component";
import { handleLocationChange } from "./actions";

const actions = {
  handleLocationChange,
};

export default connect(getLocationSelectorProps, actions)(Component);
