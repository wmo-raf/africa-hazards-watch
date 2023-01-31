import React, { Component } from "react";
import cx from "classnames";

import HighChart from "components/highcharts";
import {
  gskyWpsTemperatureAnomaliesByMonth,
  gskyWpsPrecipitationAnomaliesByMonth,
} from "utils/data";

import { toMonthName } from "utils/time";

import styles from "./anomalies-by-month.module.scss";

const MONTHS_OPTIONS = [
  { label: "Jan", value: "01" },
  { label: "Feb", value: "02" },
  { label: "Mar", value: "03" },
  { label: "Apr", value: "04" },
  { label: "May", value: "05" },
  { label: "Jun", value: "06" },
  { label: "Jul", value: "07" },
  { label: "Aug", value: "08" },
  { label: "Sep", value: "09" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

const OPTIONS = {
  accessibility: {
    enabled: false,
  },
  title: {
    style: {
      color: "#333333",
      fontSize: "1em",
    },
    align: "center",
    useHTML: true,
  },
  subtitle: {
    style: {
      color: "#333333",
      fontSize: "1em",
    },
    useHTML: true,
  },
  exporting: {
    chartOptions: {
      chart: {
        backgroundColor: "#FFFFFF",
      },
    },
    sourceWidth: 1000,
    sourceHeight: 600,
  },
  credits: {
    text: "",
    href: "",
    position: {
      align: "right",
      verticalAlign: "bottom",
      x: -30,
      y: -10,
    },
    style: {
      fontSize: "1em",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size: 12px"> {point.key}</span><br/>',
  },
  legend: {
    enabled: false,
  },
  xAxis: [],
  yAxis: [],
  series: [],
  plotOptions: {
    series: {
      states: {
        inactive: {
          opacity: 1,
        },
      },
    },
  },
};

class AnomaliesByMonth extends Component {
  state = {
    selectedMonth: String(new Date().getMonth() + 1).padStart(2, "0"),
  };

  getChartOptions = () => {
    const {
      placeName,
      temperatureAnomaliesData,
      precipitationAnomaliesData,
    } = this.props;

    const { selectedMonth } = this.state;

    const monthName = toMonthName(Number(selectedMonth));

    const chartOptions = { ...OPTIONS };

    const monthlyTemperatureAnomalies =
      temperatureAnomaliesData &&
      gskyWpsTemperatureAnomaliesByMonth(
        temperatureAnomaliesData,
        selectedMonth
      );

    const monthlyPrecipitationAnomalies =
      precipitationAnomaliesData &&
      gskyWpsPrecipitationAnomaliesByMonth(
        precipitationAnomaliesData,
        selectedMonth
      );

    const series = [];

    const xAxis = [];
    const yAxis = [];

    if (monthlyTemperatureAnomalies) {
      const monthlyAnomaliesSeries = {
        name: "August",
        type: "column",
        zonesAxis: "y",
        zones: [
          {
            value: 0,
            color: "#4582b5",
          },
          {
            color: "#c82808",
          },
        ],
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        pointPlacement: -0.6666666666666666,
        tooltip: {
          valueSuffix: " °C",
          valueDecimals: 1,
        },
        data: monthlyTemperatureAnomalies,
      };

      const xMin = Math.min(
        ...monthlyTemperatureAnomalies.map((item) => item.x)
      );
      const xMax = Math.max(
        ...monthlyTemperatureAnomalies.map((item) => item.x)
      );

      xAxis.push({
        type: "datetime",
        title: { text: null },
        gridLineWidth: 1,
        minorTicks: true,
        minorTickInterval: 31536000000,
        height: "45%",
        offset: 0,
        min: xMin,
        max: xMax,
        softMin: xMin,
        softMax: xMax,
      });

      const yMin = Math.min(
        ...monthlyTemperatureAnomalies.map((item) => item.y)
      );
      const yMax = Math.max(
        ...monthlyTemperatureAnomalies.map((item) => item.y)
      );

      yAxis.push({
        title: { text: "temperature anomaly [°C]" },
        height: "45%",
        offset: 10,
        min: yMin,
        max: yMax,
        softMin: yMin,
        softMax: yMax,
        tickInterval: 1.0,
      });

      series.push(monthlyAnomaliesSeries);
    }

    if (monthlyPrecipitationAnomalies) {
      const precipitationAnomaliesSeries = {
        name: monthName,
        type: "column",
        zonesAxis: "y",
        zones: [
          {
            value: 0,
            color: "#c08729",
          },
          {
            color: "#38a090",
          },
        ],
        xAxis: 1,
        yAxis: 1,
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        pointPlacement: -0.6666666666666666,
        tooltip: {
          valueSuffix: " mm",
          valueDecimals: 0,
        },
        data: monthlyPrecipitationAnomalies,
      };

      const xMin = Math.min(
        ...monthlyPrecipitationAnomalies.map((item) => item.x)
      );
      const xMax = Math.max(
        ...monthlyPrecipitationAnomalies.map((item) => item.x)
      );

      xAxis.push({
        type: "datetime",
        title: { text: "Year" },
        gridLineWidth: 1,
        minorTicks: true,
        minorTickInterval: 31536000000,
        top: "53%",
        height: "45%",
        offset: 0,
        min: xMin,
        max: xMax,
        softMin: xMin,
        softMax: xMax,
      });

      const yMin = Math.min(
        ...monthlyPrecipitationAnomalies.map((item) => item.y)
      );
      const yMax = Math.max(
        ...monthlyPrecipitationAnomalies.map((item) => item.y)
      );

      yAxis.push({
        title: { text: "precipitation anomaly [mm]" },
        top: "53%",
        height: "45%",
        offset: 10,
        min: yMin,
        max: yMax,
        softMin: yMin,
        softMax: yMax,
        tickInterval: 10.0,
      });

      series.push(precipitationAnomaliesSeries);
    }

    chartOptions.xAxis = xAxis;
    chartOptions.yAxis = yAxis;
    chartOptions.series = series;

    chartOptions.title.text = `${monthName} monthly anomalies for temperature and precipitation 1959-2022.`;

    chartOptions.subtitle.text = placeName;

    return chartOptions;
  };

  setSelectedMonth = (month) => {
    this.setState({ selectedMonth: month });
  };

  render() {
    const chartOptions = this.getChartOptions();

    const { selectedMonth } = this.state;

    if (chartOptions) {
      return (
        <div className={styles["widget-toolbar"]}>
          <div className={styles["months-options"]}>
            {MONTHS_OPTIONS.map((m) => {
              return (
                <div
                  className={cx("m-option", {
                    active: m.value === selectedMonth,
                  })}
                  key={m.label}
                  onClick={() => this.setSelectedMonth(m.value)}
                >
                  {m.label}
                </div>
              );
            })}
          </div>
          <HighChart options={chartOptions} />
        </div>
      );
    }

    return null;
  }
}

export default AnomaliesByMonth;
