import { connect } from "react-redux";

import Component from "./component";
import * as actions from "./actions";
import { getMyDataProps } from "./selectors";

export default connect(getMyDataProps, actions)(Component);
