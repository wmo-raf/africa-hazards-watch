import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

import "./styles.scss";

const Legend = dynamic(() => import("./legend"), {
  ssr: false,
});

class LegendTypeChoropleth extends React.PureComponent {
  static propTypes = {
    activeLayer: PropTypes.shape({}),
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

    const thresholds = legendConfig.items.map(
      (item) => item.value || item.name
    );

    const { items, ...rest } = legendConfig;
    const colors = legendConfig.items.map((item) => item.color);

    return (
      <div styleName="c-legend-type-choropleth">
        <Legend thresholds={thresholds} colors={colors} {...rest} />
      </div>
    );
  }
}

export default LegendTypeChoropleth;
