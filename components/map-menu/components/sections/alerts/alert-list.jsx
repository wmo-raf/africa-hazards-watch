import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import uniqBy from "lodash/uniqBy";

import Card from "components/ui/cap-alert-card";

import "./styles.scss";

class AlertsList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    onZoomTo: PropTypes.func,
  };

  render() {
    const { data, onZoomTo } = this.props;

    return (
      <>
        {data &&
          !!data.length &&
          data.map((alert, index) => {
            const buttons = [
              {
                text: "Zoom To Alert",
                onClick: () => onZoomTo(alert.feature),
                theme: `theme-button-small`,
              },
            ];

            return (
              <div
                key={
                  (alert.alertDetail &&
                    alert.alertDetail.identifier &&
                    `${alert.alertDetail.identifier}-${index}`) ||
                  `${alert.link}-${index}`
                }
                className="column small-12 medium-6"
              >
                <Card
                  className="map-card"
                  theme="theme-card-small"
                  clamp={5}
                  data={{ ...alert, buttons }}
                />
              </div>
            );
          })}
      </>
    );
  }
}

export default AlertsList;
