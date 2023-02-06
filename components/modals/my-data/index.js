import { connect } from "react-redux";

import { setMenuSettings } from "components/map-menu/actions";
import { setMyDataModalSettings } from "./actions";

import Component from "./component";
import { getMyDataModalProps } from "./selectors";

export default connect(getMyDataModalProps, {
  setMenuSettings,
  setMyDataModalSettings,
})(Component);
