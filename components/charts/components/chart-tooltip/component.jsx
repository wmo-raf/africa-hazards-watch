import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./chart-tooltip.module.scss";

class ChartTooltip extends PureComponent {
  render() {
    const { payload, settings, parseData, hideZeros, simple } = this.props;
    const values = payload && payload.length > 0 && payload[0].payload;

    const data = parseData ? parseData({ settings, values }) : settings;

    return (
      <div>
        {data && data.length && (
          <div
            className={cx(styles["c-chart-tooltip"], {
              [styles.simple]: simple,
            })}
          >
            {data.map((d) => {
              const label = d.labelFormat
                ? d.labelFormat(d.label || values[d.labelKey])
                : d.label || values[d.labelKey];

              const value = d.unitFormat
                ? d.unitFormat(values[d.key])
                : values[d.key];

              return hideZeros && (!values || !value) ? null : (
                <div
                  key={d.key || d.labelKey || d.label}
                  className={styles[`data-line ${d.position || ""}`]}
                >
                  {label && (
                    <div className={styles["data-label"]}>
                      {d.color &&
                        (d.dashline ? (
                          <div
                            className={`${styles["data-color"]} ${styles["data-dash"]}`}
                            style={{ borderColor: d.color }}
                          />
                        ) : (
                          <div
                            className={styles["data-color"]}
                            style={{ backgroundColor: d.color }}
                          />
                        ))}
                      {d.key === "break" ? (
                        <span className={styles["break-label"]}>{d.label}</span>
                      ) : (
                        <span>{label}</span>
                      )}
                    </div>
                  )}
                  <div className={styles.notranslate}>
                    {value !== null && d.unit && d.unitFormat
                      ? `${value}${d.unit}`
                      : d.nullValue || value}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

ChartTooltip.propTypes = {
  payload: PropTypes.array,
  settings: PropTypes.array,
  parseData: PropTypes.func,
  hideZeros: PropTypes.bool,
  simple: PropTypes.bool,
};

export default ChartTooltip;
