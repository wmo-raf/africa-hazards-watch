import { createElement, PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Component from "./component";
import reducerRegistry from "redux/registry";

import reducers, { initialState } from "./reducers";
import * as ownActions from "./actions";
import { getClimateChangeProps } from "./selectors";

const actions = {
  ...ownActions,
};

class ClimateChangeContainer extends PureComponent {
  render() {
    return createElement(Component, {
      ...this.props,
      ...this.state,
    });
  }
}

reducerRegistry.registerModule("climateChange", {
  actions,
  reducers,
  initialState,
});

export default connect(getClimateChangeProps, actions)(ClimateChangeContainer);
