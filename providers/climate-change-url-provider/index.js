import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Url from "components/url";

import selectMapParams from "./selectors";

const ClimateChangeUrlProvider = ({ urlParams }) => {
  return <Url queryParams={urlParams} />;
};

ClimateChangeUrlProvider.propTypes = {
  urlParams: PropTypes.object,
};

export default connect(selectMapParams)(ClimateChangeUrlProvider);
