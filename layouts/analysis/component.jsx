import React, { Component } from "react";
import Cover from "components/cover";
import { Row, Column } from "@erick-otenyo/hw-components";

import "./styles.scss";

class AnalysisComponent extends Component {
  render() {
    return (
      <div className="l-analysis-page">
        <Cover
          title="Forecast Analysis"
        ></Cover>
        <Row>
          <Column>
            <div>Hello</div>
          </Column>
        </Row>
      </div>
    );
  }
}

export default AnalysisComponent;
