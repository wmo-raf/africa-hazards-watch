import React, { Component } from "react";
import HighChart from "components/highcharts";
import { gskyWpsPrecipitationDataByYear } from "utils/data";

const OPTIONS = {
  accessibility: {
    enabled: false,
  },
  title: {
    text: "Mean yearly precipitation, trend and anomaly, 1959-2022.",
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
    text: "hazardswatch.wmo.int",
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
        text: "mean [mm]",
      },
      height: "45%",
      offset: 10,
      labels: {
        format: "{value}",
      },
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
          color: "#543005",
          from: -776.0,
          to: -1381.5320714712143,
        },
        {
          color: "#543005",
          from: -1381.5320714712143,
          to: -1208.8405625373125,
        },
        {
          color: "#774508",
          from: -1208.8405625373125,
          to: -1036.1490536034107,
        },
        {
          color: "#995d13",
          from: -1036.1490536034107,
          to: -863.4575446695089,
        },
        {
          color: "#b97b29",
          from: -863.4575446695089,
          to: -690.7660357356071,
        },
        {
          color: "#cfa155",
          from: -690.7660357356071,
          to: -518.0745268017054,
        },
        {
          color: "#e2c786",
          from: -518.0745268017054,
          to: -345.3830178678036,
        },
        {
          color: "#f0deb1",
          from: -345.3830178678036,
          to: -172.6915089339018,
        },
        {
          color: "#f6edd6",
          from: -172.6915089339018,
          to: 0.0,
        },
        {
          color: "#f5f5f5",
          from: 0.0,
          to: 172.6915089339018,
        },
        {
          color: "#d8eeeb",
          from: 172.6915089339018,
          to: 345.3830178678036,
        },
        {
          color: "#b5e3dc",
          from: 345.3830178678036,
          to: 518.0745268017054,
        },
        {
          color: "#89d1c6",
          from: 518.0745268017054,
          to: 690.7660357356071,
        },
        {
          color: "#5bb2a8",
          from: 690.7660357356071,
          to: 863.4575446695089,
        },
        {
          color: "#2f9189",
          from: 863.4575446695089,
          to: 1036.1490536034107,
        },
        {
          color: "#0e726a",
          from: 1036.1490536034107,
          to: 1208.8405625373125,
        },
        {
          color: "#01564d",
          from: 1208.8405625373125,
          to: 1381.5320714712143,
        },
        {
          color: "#01564d",
          from: 1381.5320714712143,
          to: 776.0,
        },
      ],
      showInLegend: false,
      visible: false,
    },
  ],
  series: [],
};

class YearlyPrecipitation extends Component {
  componentDidUpdate(prevProps, prevState) {}

  getChartOptions = () => {
    const { placeName, averagesData, anomaliesData } = this.props;

    const chartOptions = { ...OPTIONS };

    const averagesDataByYear =
      averagesData && gskyWpsPrecipitationDataByYear(averagesData);

    const anomaliesDataByYear =
      anomaliesData && gskyWpsPrecipitationDataByYear(anomaliesData);

    const series = [];

    if (averagesDataByYear) {
      const data = averagesDataByYear.map((d) => ({
        x: Number(d.year),
        y: d.mean,
        colorValue: d.mean,
      }));

      const meanSeries = {
        name: "mean precipitation",
        type: "line",
        marker: {
          enabled: false,
          fillColor: "purple",
        },
        color: "purple",
        colorAxis: 1,
        colorKey: "colorValue",
        id: "mean_precipitation",
        xAxis: 1,
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
        linkedTo: "mean_precipitation",
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
        name: "precipitation anomaly",
        type: "column",
        colorAxis: 1,
        colorKey: "colorValue",
        xAxis: 1,
        yAxis: 1,
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0,
        tooltip: {
          pointFormat: "{series.name}: <b>{point.colorValue:.1f}</b><br/>",
          valueSuffix: " mm",
        },
        showInLegend: false,
        data,
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

export default YearlyPrecipitation;
