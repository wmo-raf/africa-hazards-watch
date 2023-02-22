import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Url from "components/url";

import selectCapParams from "./selectors";

const CapUrlProvider = ({ urlParams }) => <Url queryParams={urlParams} />;

CapUrlProvider.propTypes = {
  urlParams: PropTypes.object,
};

export default connect(selectCapParams)(CapUrlProvider);
