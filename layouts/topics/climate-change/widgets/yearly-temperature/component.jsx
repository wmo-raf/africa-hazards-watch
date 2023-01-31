import React, { Component } from "react";
import HighChart from "components/highcharts";
import { gskyWpsDataByYear } from "utils/data";

import "./yearly-temperature.module.scss";

const OPTIONS = {
  accessibility: {
    enabled: false,
  },
  title: {
    text: "Mean yearly temperature, trend and anomaly, 1959-2022.",
    style: {
      color: "#333333",
      fontSize: "1em",
    },
    useHTML: true,
  },
  subtitle: {
    style: {
      color: "#333333",
      fontSize: "1em",
    },
    useHTML: true,
  },
  credits: {
    enabled: false,
    text: "africahazardswatch.wmo.int",
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
  exporting: {
    enabled: true,
    chartOptions: {
      chart: {
        backgroundColor: "#FFFFFF",
      },
    },
    sourceWidth: 1000,
    sourceHeight: 600,
  },
  tooltip: {
    headerFormat: '<span style="font-size: 12px"> {point.key}</span><br/>',
    shared: true,
    split: true,
    crosshairs: true,
  },
  legend: {
    enabled: false,
  },
  xAxis: [
    {
      title: {
        text: null,
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 1,
      minorTicks: false,
      height: "45%",
      crosshair: {
        color: "#cccccc",
        dashStyle: "solid",
        shared: true,
      },
      offset: 0,
    },
    {
      title: {
        text: "Year",
      },
      gridLineWidth: 1,
      minorTicks: true,
      minorTickInterval: 1,
      tickInterval: 1,
      top: "0%",
      height: "97%",
      offset: 0,
      crosshair: {
        color: "#cccccc",
        dashStyle: "solid",
        shared: true,
      },
    },
  ],
  yAxis: [
    {
      title: {
        text: "mean [°C]",
      },
      height: "45%",
      offset: 10,
    },
    {
      title: {
        text: "anomaly stripes",
      },
      top: "52%",
      height: "45%",
      offset: 40,
      min: 0,
      max: 10,
      softMin: 0,
      softMax: 10,
      labels: {
        enabled: false,
      },
    },
  ],
  colorAxis: [
    {},
    {
      dataClasses: [
        {
          color: "#08306b",
          from: -2.0,
          to: -3.0,
        },
        {
          color: "#08306b",
          from: -3.0,
          to: -2.625,
        },
        {
          color: "#08519c",
          from: -2.625,
          to: -2.25,
        },
        {
          color: "#2171b5",
          from: -2.25,
          to: -1.875,
        },
        {
          color: "#4292c6",
          from: -1.875,
          to: -1.5,
        },
        {
          color: "#6baed6",
          from: -1.5,
          to: -1.125,
        },
        {
          color: "#9ecae1",
          from: -1.125,
          to: -0.75,
        },
        {
          color: "#c6dbef",
          from: -0.75,
          to: -0.375,
        },
        {
          color: "#deebf7",
          from: -0.375,
          to: 0.0,
        },
        {
          color: "#fee0d2",
          from: 0.0,
          to: 0.375,
        },
        {
          color: "#fcbba1",
          from: 0.375,
          to: 0.75,
        },
        {
          color: "#fc9272",
          from: 0.75,
          to: 1.125,
        },
        {
          color: "#fb6a4a",
          from: 1.125,
          to: 1.5,
        },
        {
          color: "#ef3b2c",
          from: 1.5,
          to: 1.875,
        },
        {
          color: "#cb181d",
          from: 1.875,
          to: 2.25,
        },
        {
          color: "#a50f15",
          from: 2.25,
          to: 2.625,
        },
        {
          color: "#67000d",
          from: 2.625,
          to: 3.0,
        },
        {
          color: "#67000d",
          from: 3.0,
          to: 2.0,
        },
      ],
      showInLegend: false,
      visible: false,
    },
  ],
  series: [],
};

class YearlyTemperature extends Component {
  componentDidUpdate(prevProps, prevState) {}

  getChartOptions = () => {
    const { placeName, averagesData, anomaliesData } = this.props;

    const chartOptions = { ...OPTIONS };

    const averagesDataByYear =
      averagesData && gskyWpsDataByYear(averagesData, { subtract: 273.15 }); // convert from K to °C

    const anomaliesDataByYear =
      anomaliesData && gskyWpsDataByYear(anomaliesData);

    const series = [];

    if (averagesDataByYear) {
      const data = averagesDataByYear.map((d) => ({
        x: Number(d.year),
        y: d.mean,
        colorValue: d.mean,
      }));

      const meanSeries = {
        name: "mean temperature",
        type: "line",
        marker: {
          enabled: false,
          fillColor: "purple",
        },
        color: "purple",
        colorAxis: 1,
        colorKey: "colorValue",
        xAxis: 1,
        id: "mean_temp",
        yAxis: 0,
        tooltip: {
          pointFormat:
            "{series.name}: <b>{point.y:.1f} {wvar_attr.udm}</b><br/>",
        },
        data,
      };

      series.push(meanSeries);

      const trendSeries = {
        name: "trend",
        type: "trendline",
        linkedTo: "mean_temp",
        marker: {
          enabled: false,
          fillColor: "blue",
        },
        color: "blue",
        dashStyle: "Dash",
        colorAxis: 1,
        colorKey: "colorValue",
        xAxis: 1,
        yAxis: 0,
        enableMouseTracking: false,
      };
      series.push(trendSeries);
    }

    if (anomaliesDataByYear) {
      const data = anomaliesDataByYear.map((d) => ({
        x: Number(d.year),
        y: 8,
        colorValue: d.mean,
      }));

      const anomalySeries = {
        name: "temperature anomaly",
        type: "column",
        colorAxis: 1,
        colorKey: "colorValue",
        data: [],
        xAxis: 1,
        yAxis: 1,
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        tooltip: {
          pointFormat: "{series.name}: <b>{point.colorValue:.1f}</b><br/>",
          valueSuffix: " °C",
        },
        showInLegend: false,
        data: data,
      };

      series.push(anomalySeries);
    }

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

export default YearlyTemperature;
