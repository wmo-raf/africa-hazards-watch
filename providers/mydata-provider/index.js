import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import reducerRegistry from "redux/registry";

import * as actions from "./actions";
import reducers, { initialState } from "./reducers";
import { getMyDataProps } from "./selectors";

class MyDataProvider extends PureComponent {
  static propTypes = {
    getMyDatasetsProvider: PropTypes.func.isRequired,
    getMyDatasetProvider: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool,
    loggingIn: PropTypes.bool,
    loading: PropTypes.bool,
    location: PropTypes.object,
    myDatasets: PropTypes.array,
  };

  componentDidMount() {
    const { loggedIn, loading } = this.props;

    if (!loading && loggedIn) {
      this.handleGetMyDatasets();
    }
  }

  componentDidUpdate(prevProps) {
    const { loggedIn, loggingIn, loading, location, myDatasets } = this.props;
    const { loggedIn: prevLoggedIn } = prevProps;

    if (!loading && loggedIn && loggedIn !== prevLoggedIn) {
      this.handleGetMyDatasets();
    }
  }

  handleGetMyDatasets = (id) => {
    const { getMyDatasetProvider, getMyDatasetsProvider } = this.props;

    if (id) {
      getMyDatasetProvider(id);
    } else {
      getMyDatasetsProvider();
    }
  };

  render() {
    return null;
  }
}

reducerRegistry.registerModule("mydata", {
  actions,
  reducers,
  initialState,
});

export default connect(getMyDataProps, actions)(MyDataProvider);
