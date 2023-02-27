import { connect } from "react-redux";

import Component from "./component";

import { getAlertsGeostoreIds, getAlertsAnalysis } from "../../actions";

import { getCapExposureProps } from "./selectors";

const actions = {
  getAlertsGeostoreIds,
  getAlertsAnalysis,
};

export default connect(getCapExposureProps, actions)(Component);
