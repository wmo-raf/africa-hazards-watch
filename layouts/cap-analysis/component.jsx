import React, { Component } from "react";
import { Row, Column } from "@erick-otenyo/hw-components";

import LocationProvider from "providers/location-provider";
import Cover from "components/cover";

import "./styles.scss";

class CapAnalysisComponent extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { capUrl, fetchCapDetail } = this.props;

    const { capUrl: prevCapUrl } = prevProps;

    if (capUrl && prevCapUrl != capUrl && fetchCapDetail) {
      fetchCapDetail(capUrl);
    }
  }

  componentDidMount() {
    const { capUrl, fetchCapDetail } = this.props;

    if (capUrl && fetchCapDetail) {
      fetchCapDetail(capUrl);
    }
  }

  render() {
    const { alertsDetail } = this.props;

    console.log(alertsDetail);
    return (
      <div className="l-analysis-page">
        <LocationProvider />
        <Cover title="Cap Analysis"></Cover>
        <Row>
          <Column>
            <div>Hello</div>
          </Column>
        </Row>
      </div>
    );
  }
}

export default CapAnalysisComponent;
