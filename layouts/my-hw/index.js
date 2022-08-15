import { connect } from "react-redux";

import Component from "./component";
import { getMyHwProps } from "./selectors";

export default connect(getMyHwProps)(Component);
