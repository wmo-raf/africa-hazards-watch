import Component from "./component";
import { connect } from "react-redux";

import { setMyDataModalSettings } from "components/modals/my-data/actions";

export default connect(null, {
  setMyDataModalSettings,
})(Component);
