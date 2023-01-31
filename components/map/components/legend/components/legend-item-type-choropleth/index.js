import React from "react";
import PropTypes from "prop-types";

import styles from "./legend-item-type-choropleth.module.scss";

class LegendTypeChoropleth extends React.PureComponent {
  static propTypes = {
    activeLayer: PropTypes.shape({
      legendConfig: PropTypes.shape({
        type: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  };

  static defaultProps = {
    activeLayer: {},
  };

  render() {
    const { activeLayer } = this.props;
    const { legendConfig } = activeLayer;

    if (!legendConfig || legendConfig.type !== "choropleth") {
      return null;
    }

    return (
      <div className={styles["c-legend-type-choropleth"]}>
        <ul>
          {legendConfig.items.map(({ color }, i) => (
            <li
              key={`legend-choropleth-item-${color}-${i}`}
              style={{ width: `${100 / legendConfig.items.length}%` }}
            >
              <div
                className={styles["icon-choropleth"]}
                style={{ backgroundColor: color }}
              />
            </li>
          ))}
        </ul>
        <ul>
          {legendConfig.items
            .filter((i) => i.value || i.name)
            .map(({ name, value, color, styles = {} }, i) => (
              <li
                key={`legend-choropleth-item-${color}-${i}`}
                style={{ width: `${100 / legendConfig.items.length}%` }}
              >
                <span className={styles.name} style={styles}>
                  {name || value}
                </span>
              </li>
            ))}
        </ul>
        <ul>
          {legendConfig.items.map(({ label }) =>
            label ? (
              <li key={`legend-choropleth-item-${label}`}>
                <span className={styles.label}>{label}</span>
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  }
}

export default LegendTypeChoropleth;
