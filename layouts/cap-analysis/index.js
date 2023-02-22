import { connect } from "react-redux";

import Component from "./component";

import reducerRegistry from "redux/registry";

import reducers, { initialState } from "./reducers";
import * as ownActions from "./actions";
import { getCapProps } from "./selectors";

const actions = {
  ...ownActions,
};

reducerRegistry.registerModule("cap", {
  actions,
  reducers,
  initialState,
});

export default connect(getCapProps, actions)(Component);
