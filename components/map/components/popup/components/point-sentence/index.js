import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { formatNumber } from "utils/format";
import Button from "components/ui/button";

import "./styles.scss";

class PointSentence extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    onAnalyze: PropTypes.func,
  };

  render() {
    const { lat, lon, onAnalyze, actionLabel, small } = this.props;

    return lat && lon ? (
      <div className="c-point-sentence">
        <div className="sentence">
          <p>
            <b>Lat: </b> {formatNumber({ num: lat, unit: "" })}
          </p>
          <p>
            <b>Lng: </b> {formatNumber({ num: lon, unit: "" })}
          </p>
        </div>

        <Button
          theme={cx({ "theme-button-medium": small })}
          onClick={() => {
            onAnalyze();
          }}
        >
          {actionLabel ? actionLabel : "analyze"}
        </Button>
      </div>
    ) : null;
  }
}

export default PointSentence;
