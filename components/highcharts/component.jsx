import React from "react";

import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsColorAxis from "highcharts/modules/coloraxis";
import HighchartsIndicators from "highcharts/indicators/indicators";
import HighchartsTrend from "highcharts/indicators/trendline";

import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsColorAxis(Highcharts);
  HighchartsIndicators(Highcharts);
  HighchartsTrend(Highcharts);
}

const RHChart = ({ options }) => {
  if (options) {
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }

  return null;
};

export default RHChart;
