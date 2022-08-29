import { connect } from "react-redux";

import { setMapSettings } from "components/map/actions";

import Component from "./component";
import { getCapAlertCardProps } from "./selectors";

export default connect(getCapAlertCardProps, { setMapSettings })(Component);
