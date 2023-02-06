import Component from "./component";
import { connect } from "react-redux";

import { setMyDataModalSettings } from "components/modals/my-data/actions";

import { setMyDataSettings } from "providers/mydata-provider/actions";

export default connect(null, {
  setMyDataModalSettings,
  setMyDataSettings,
})(Component);
