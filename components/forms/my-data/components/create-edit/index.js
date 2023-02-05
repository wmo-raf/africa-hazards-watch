import { connect } from "react-redux";

import Component from "./component";
import * as ownActions from "./actions";

import { getMyDataProps } from "./selectors";

const actions = { ...ownActions };

export default connect(getMyDataProps, actions)(Component);
