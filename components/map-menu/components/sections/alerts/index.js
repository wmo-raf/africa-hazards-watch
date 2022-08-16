import { createElement, PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Component from "./component";

import { mapStateToProps } from "./selectors";

class AlertsMenu extends PureComponent {
  render() {
    return createElement(Component, {
      ...this.props,
    });
  }
}

AlertsMenu.propTypes = {
  setMenuSettings: PropTypes.func,
  setMenuLoading: PropTypes.func,

  lang: PropTypes.string,
};

export default connect(mapStateToProps, {})(AlertsMenu);
