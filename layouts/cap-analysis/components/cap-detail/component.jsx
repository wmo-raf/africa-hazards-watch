import React, { Component } from "react";

import "./styles.scss";

class CapDetail extends Component {
  render() {
    const { alert } = this.props;

    const { info } = alert || {};

    if (!info) {
      return null;
    }

    return (
      <div className="cap-detail">
        <div>
          <div className="header">Event</div>
          <div>{info.event}</div>
        </div>
        <div>
          <div className="header">Event Description</div>
          <div>{info.description}</div>
        </div>

        <div>
          <div className="header">Instructions</div>
          <div>{info.instruction}</div>
        </div>

        <div>
          <div className="header">Affected Area</div>
          <div>
            {info.area &&
              info.area.features.map((feat) => (
                <span key={feat.id}>{feat.properties.areaDesc}; </span>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CapDetail;
