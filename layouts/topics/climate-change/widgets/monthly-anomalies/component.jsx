import React, { Component } from "react";
import HighChart from "components/highcharts";
import {
  gskyWpsPrecipitationDataByTimestamp,
  gskyWpsDataByTimestamp,
} from "utils/data";

const OPTIONS = {
  accessibility: { enabled: false },
  title: {
    text: "Monthly anomalies for temperature and precipitation 1959-2022.",
    style: { color: "#333333", fontSize: "1em" },
    align: "center",
    useHTML: true,
  },
  subtitle: {
    style: { color: "#333333", fontSize: "1em" },
    useHTML: true,
  },
  exporting: {
    chartOptions: { chart: { backgroundColor: "#FFFFFF" } },
    sourceWidth: 1000,
    sourceHeight: 600,
  },
  credits: {
    enabled: false,
    text: "hazardswatch.wmo.int",
    href: "",
    position: { align: "right", verticalAlign: "bottom", x: -30, y: -10 },
    style: { fontSize: "1em" },
  },
  tooltip: {
    headerFormat: '<span style="font-size: 12px"> {point.key}</span><br/>',
  },
  legend: { enabled: false },
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

class MonthlyAnomalies extends Component {
  componentDidUpdate(prevProps, prevState) {}

  getChartOptions = () => {
    const {
      placeName,
      temperatureAnomaliesData,
      precipitationAnomaliesData,
    } = this.props;

    const chartOptions = { ...OPTIONS };

    const monthlyTemperatureAnomalies =
      temperatureAnomaliesData &&
      gskyWpsDataByTimestamp(temperatureAnomaliesData);

    const monthlyPrecipitationAnomalies =
      precipitationAnomaliesData &&
      gskyWpsPrecipitationDataByTimestamp(precipitationAnomaliesData);

    const series = [];

    const xAxis = [];
    const yAxis = [];

    if (monthlyTemperatureAnomalies) {
      const monthlyAnomaliesSeries = {
        name: "Anomaly",
        type: "column",
        zonesAxis: "y",
        zones: [{ value: 0, color: "#4582b5" }, { color: "#c82808" }],
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        pointPlacement: "between",
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
        name: "Anomaly",
        type: "column",
        zonesAxis: "y",
        zones: [{ value: 0, color: "#c08729" }, { color: "#38a090" }],
        xAxis: 1,
        yAxis: 1,
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        pointPlacement: "between",
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
        title: { text: "Month" },
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

    chartOptions.subtitle.text = placeName;

    return chartOptions;
  };

  render() {
    const chartOptions = this.getChartOptions();

    if (chartOptions) {
      return <HighChart options={chartOptions} />;
    }

    return null;
  }
}

export default MonthlyAnomalies;
