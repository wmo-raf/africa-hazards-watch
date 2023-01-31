import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Button from "components/ui/button";

import styles from "./chart-legend.module.scss";

class ChartLegend extends PureComponent {
  render() {
    const { config, className, simple, toggleSettingsMenu } = this.props;

    return (
      <ul className={cx(styles["c-chart-legend"], className, { simple })}>
        {Object.keys(config).map((k) => {
          const item = config[k];

          return (
            <li className={styles["legend-item"]} key={k}>
              <div className={styles["legend-title"]}>
                <span
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <p>{item.label}</p>
              </div>
            </li>
          );
        })}
        {toggleSettingsMenu && (
          <Button
            theme={[styles["theme-button-small"], styles["theme-button-light"]]}
            className={styles["contextual-settings-btn"]}
            onClick={() => toggleSettingsMenu()}
          >
            + Add year to compare
          </Button>
        )}
      </ul>
    );
  }
}

ChartLegend.propTypes = {
  config: PropTypes.object,
  simple: PropTypes.bool,
  className: PropTypes.string,
  toggleSettingsMenu: PropTypes.func,
};

export default ChartLegend;
