import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";

import PieChart from "components/charts/pie-chart";
import PieChartLegend from "components/charts/components/pie-chart-legend";
import Button from "components/ui/button";

import styles from "./widget-pie-chart-legend.module.scss";

class WidgetPieChart extends PureComponent {
  render() {
    const {
      data,
      legendData,
      settings,
      simple,
      toggleSettingsMenu,
      settingsBtnConfig,
    } = this.props;
    const showSettingsBtn =
      settingsBtnConfig &&
      settingsBtnConfig.shouldShowButton &&
      settingsBtnConfig.shouldShowButton(this.props);
    return (
      <div className={styles["c-pie-chart-legend-widget"]}>
        {settings && showSettingsBtn && toggleSettingsMenu && (
          <Button
            theme={
              settingsBtnConfig?.theme ||
              "theme-button-small theme-button-light"
            }
            className={styles["pie-contextual-settings-btn"]}
            onClick={() => toggleSettingsMenu()}
          >
            {settingsBtnConfig.text}
          </Button>
        )}
        <div className={styles["pie-and-legend"]}>
          <PieChartLegend
            className={styles["cover-legend"]}
            data={legendData || data}
            config={{
              format: ".3s",
              unit: "ha",
              key: "value",
              ...settings,
            }}
            simple={simple}
          />
          <PieChart
            className={styles["cover-pie-chart"]}
            data={data}
            maxSize={140}
            tooltip={[
              {
                key: "percentage",
                unit: "%",
                labelKey: "label",
                unitFormat: (value) => format(".1f")(value),
              },
            ]}
            simple={simple}
          />
        </div>
      </div>
    );
  }
}

WidgetPieChart.propTypes = {
  data: PropTypes.array,
  legendData: PropTypes.array,
  simple: PropTypes.bool,
  settings: PropTypes.object.isRequired,
  toggleSettingsMenu: PropTypes.func,
  settingsBtnConfig: PropTypes.object,
};

export default WidgetPieChart;
