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
    clearGeodescriber: PropTypes.func,
    getGeodescriber: PropTypes.func,
    geojson: PropTypes.object,
    location: PropTypes.object,
    loading: PropTypes.bool,
    embed: PropTypes.bool,
  };

  componentDidMount() {
    const { location, loading, geojson, clearGeodescriber } = this.props;
    const allowedLocationTypes = this.getAllowedLocationTypes();

    if (!loading && !allowedLocationTypes.includes(location.type) && geojson) {
      this.handleGetGeodescriber();
    }

    if (location.type === "point") {
      clearGeodescriber({});
    }
  }

  componentDidUpdate(prevProps) {
    const { loading, geojson, location, clearGeodescriber } = this.props;
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
    let types = ["africa"];

    if (!embed) {
      types = [...types, "country", "point", "use"];
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
