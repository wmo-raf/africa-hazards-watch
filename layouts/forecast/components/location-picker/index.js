import { connect } from "react-redux";

import { handleLocationChange } from "layouts/forecast/actions";
import { getPickerProps } from "./selectors";

import Component from "./component";

const actions = {
  handleLocationChange,
};

export default connect(getPickerProps, actions)(Component);
