import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import reducerRegistry from "redux/registry";

import * as actions from "./actions";
import reducers, { initialState } from "./reducers";
import { getDatasetProps } from "./selectors";

// import TimeProvider from "../dataset-autoupdate-provider/TimeProvider";

class DatasetsProvider extends PureComponent {
  componentDidMount() {
    const { fetchDatasets, activeDatasets } = this.props;

    fetchDatasets(activeDatasets);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { autoTimeProviders } = this.props;
  //   console.log(autoTimeProviders);
  // }

  // getAutoTimeCompoments = () => {
  //   const { autoTimeProviders } = this.props;
  //   return autoTimeProviders.map((t) => <TimeProvider key={t.layer} {...t} />);
  // };

  render() {
    return null;
  }
}

DatasetsProvider.propTypes = {
  fetchDatasets: PropTypes.func.isRequired,
  activeDatasets: PropTypes.array,
};

reducerRegistry.registerModule("datasets", {
  actions,
  reducers,
  initialState,
});

export default connect(getDatasetProps, actions)(DatasetsProvider);
