import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import reducerRegistry from "redux/registry";

import { setMapSettings } from "components/map/actions";
import * as ownActions from "./actions";
import reducers, { initialState } from "./reducers";
import { getDatasetUpdateProps } from "./selectors";

import LayerUpdateProvider from "./Update";

const actions = {
  ...ownActions,
  setMapSettings,
};

class DatasetUpdateProvider extends PureComponent {
  componentDidUpdate(prevProps, prevState) {
    const { updateProviders } = this.props;
  }

  getLayerUpdateCompoments = () => {
    const { updateProviders } = this.props;
    return updateProviders.map((t) => (
      <LayerUpdateProvider key={t.layer} {...t} />
    ));
  };

  render() {
    return this.getLayerUpdateCompoments();
  }
}

DatasetUpdateProvider.propTypes = {
  activeDatasets: PropTypes.array,
  activeLayers: PropTypes.array,
  updateProviders: PropTypes.array,
  setMapSettings: PropTypes.func,
};

reducerRegistry.registerModule("datasetsUpdate", {
  actions,
  reducers,
  initialState,
});

export default connect(getDatasetUpdateProps, actions)(DatasetUpdateProvider);
