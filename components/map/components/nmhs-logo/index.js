import { connect } from "react-redux";

import Component from "./component";

import { getProps } from "./selectors";

export default connect(getProps)(Component);
