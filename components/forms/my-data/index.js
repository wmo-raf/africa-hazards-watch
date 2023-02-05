import { connect } from "react-redux";

import Component from "./component";
import { getMyDataProps } from "./selectors";

import {
  setMyDataSettings,
  setMyDataUploading,
} from "providers/mydata-provider/actions";

const actions = { setMyDataSettings, setMyDataUploading };

export default connect(getMyDataProps, actions)(Component);
