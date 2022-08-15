import { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CancelToken } from "axios";
import isEqual from "lodash/isEqual";
import reducerRegistry from "redux/registry";

import * as actions from "./actions";
import reducers, { initialState } from "./reducers";
import { getGeodescriberProps } from "./selectors";

class GeodescriberProvider extends PureComponent {
  static propTypes = {
    getGeodescriber: PropTypes.func,
    geojson: PropTypes.object,
    location: PropTypes.object,
    loading: PropTypes.bool,
    embed: PropTypes.bool,
  };

  componentDidMount() {
    const { location, loading, geojson } = this.props;
    const allowedLocationTypes = this.getAllowedLocationTypes();

    if (!loading && !allowedLocationTypes.includes(location.type) && geojson) {
      this.handleGetGeodescriber();
    }
  }

  componentDidUpdate(prevProps) {
    const { loading, geojson, location } = this.props;
    const { geojson: prevGeojosn, location: prevLocation } = prevProps;
    const allowedLocationTypes = this.getAllowedLocationTypes();

    if (
      !loading &&
      !allowedLocationTypes.includes(location.type) &&
      geojson &&
      !isEqual(geojson, prevGeojosn)
    ) {
      this.handleGetGeodescriber();
    }
  }

  getAllowedLocationTypes = () => {
    const { embed } = this.props;
    let types = ["ea"];

    if (!embed) {
      types = [...types, "country"];
    }
    return types;
  };

  handleGetGeodescriber = () => {
    const { geojson, getGeodescriber } = this.props;
    this.cancelGeodescriberFetch();
    this.geodescriberFetch = CancelToken.source();
    if (geojson) {
      getGeodescriber({
        geojson,
        token: this.geodescriberFetch.token,
        lang: "en",
      });
    }
  };

  cancelGeodescriberFetch = () => {
    if (this.geodescriberFetch) {
      this.geodescriberFetch.cancel("Cancelling geodescriber fetch");
    }
  };

  render() {
    return null;
  }
}

reducerRegistry.registerModule("geodescriber", {
  actions,
  reducers,
  initialState,
});

export default connect(getGeodescriberProps, actions)(GeodescriberProvider);
