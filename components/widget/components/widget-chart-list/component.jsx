import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formatUSD } from "utils/format";

import ComposedChart from "components/charts/composed-chart";
import NumberedList from "components/numbered-list";

import styles from "./widget-chart-list.module.scss";

class WidgetChartList extends PureComponent {
  render() {
    const { data, config, settings, embed } = this.props;
    const { chartData, rankedData } = data;

    return (
      <div className={styles["c-widget-chart-list"]}>
        {data && (
          <ComposedChart className={styles.chart} data={chartData} config={config} />
        )}
        {rankedData && (
          <NumberedList
            className={styles["locations-list"]}
            data={rankedData}
            settings={{
              ...settings,
              unit: settings.unit === "net_perc" ? "%" : " $",
              unitFormat:
                settings.unit !== "net_perc"
                  ? (value) => formatUSD(value)
                  : null,
            }}
            linkExt={embed}
          />
        )}
      </div>
    );
  }
}

WidgetChartList.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  settings: PropTypes.object,
  embed: PropTypes.bool,
};
export default WidgetChartList;
