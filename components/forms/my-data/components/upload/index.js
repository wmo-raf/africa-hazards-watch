import { connect } from "react-redux";

import Component from "./component";
import * as ownActions from "./actions";
import { getMyDataUploadProps } from "./selectors";

import {
  setMyDataSettings,
  setMyDataUploading,
} from "providers/mydata-provider/actions";

const actions = { ...ownActions, setMyDataSettings, setMyDataUploading };

export default connect(getMyDataUploadProps, actions)(Component);
