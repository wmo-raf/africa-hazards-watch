import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";

import styles from "./sankey-tooltip.module.scss";

class SankeyTooltip extends PureComponent {
  render() {
    const { config, content, tooltipChildren } = this.props;
    const suffix = config.suffix ? ` ${config.suffix}` : "";
    const scale = config.scale || 1;
    const valueFormat = config.format || "n";
    return (
      <div className={styles["c-sankey-tooltip"]}>
        {content &&
          content.payload &&
          content.payload.length > 0 &&
          content.payload.map((node) =>
            node.payload ? (
              <div key={node.name}>
                <div className={styles["tp-header"]}>
                  <span className={styles["tp-target-name"]}>
                    {node.payload.payload &&
                      node.payload.payload.target &&
                      `${node.payload.payload.target.name}
                           ${
                             node.payload.payload.timeframes
                               ? node.payload.payload.timeframes
                               : ""
                           }`}
                  </span>
                  {config.unit && (
                    <span className={styles["tp-unit"]}>{config.unit}</span>
                  )}
                </div>
                <div className={styles["tp-label"]}>
                  <div className={styles["tp-legend"]}>
                    <span
                      className={styles["tp-label-dot"]}
                      style={
                        node.payload.payload && {
                          backgroundColor: node.payload.payload.source
                            ? node.payload.payload.source.color
                            : node.payload.payload.color,
                        }
                      }
                    />
                    <div className={styles["tp-label-name"]}>
                      {node.payload.payload && node.payload.payload.source
                        ? node.payload.payload.source.name
                        : node.payload.payload && node.payload.payload.name}
                    </div>
                  </div>
                  <div className={styles["tp-label-value"]}>
                    {`${format(valueFormat)(node.value * scale)}${suffix}`}
                  </div>
                </div>
                <div className={styles["tooltip-children"]}>
                  {tooltipChildren && tooltipChildren(node)}
                </div>
              </div>
            ) : null
          )}
        {content && !content.payload && <div>No data</div>}
      </div>
    );
  }
}

SankeyTooltip.propTypes = {
  content: PropTypes.shape({
    payload: PropTypes.array,
  }),
  config: PropTypes.shape({
    unit: PropTypes.string,
    suffix: PropTypes.string,
    scale: PropTypes.number,
    format: PropTypes.string,
  }),
  tooltipChildren: PropTypes.func,
};

SankeyTooltip.defaultProps = {
  content: null,
  config: {},
  tooltipChildren: null,
};

export default SankeyTooltip;
