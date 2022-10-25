import React, { Component } from "react";
import { all, spread } from "axios";
import { CancelToken } from "axios";
import { fetchGskyWps } from "services/gsky-wps";
import isEqual from "lodash/isEqual";

import Loader from "components/ui/loader";

import { Row, Column, Desktop, Mobile } from "hw-components";

import YearlyTemperature from "./yearly-temperature";
import YearlyPrecipitation from "./yearly-precipitation/component";
import MonthlyAnomalies from "./monthly-anomalies/component";
import AnomaliesByMonth from "./anomalies-by-month/component";

import "./styles.scss";

const LAYERS = [
  { label: "Temperature Mean", id: "era5monthly_temperature_2_m" },
  { label: "Temperature Anomaly", id: "era5monthly_temperature_2_m_anomaly" },
  { label: "Precipitation Mean", id: "era5monthly_precipitation_1_day" },
  {
    label: "Precipitation Anomaly",
    id: "era5monthly_precipitation_1_day_anomaly",
  },
];

const Widget = ({
  title,
  chartComponent: ChartComponent,
  children,
  loading,
  ...rest
}) => {
  return (
    <div className="chart-wrapper">
      {title && <h2 className="chart-header">{title}</h2>}
      {ChartComponent && (
        <div className="chart-container">
          {loading ? (
            <Loader className="chart-loader" />
          ) : (
            <ChartComponent {...rest} />
          )}
        </div>
      )}
      {children && <div className="chart-description">{children}</div>}
    </div>
  );
};

class ClimateChangeWidgets extends Component {
  getLatLng = () => {
    const { location } = this.props;

    const adm0 = location && Number(location.adm0);
    const adm1 = location && Number(location.adm1);

    if (!isNaN(adm0) && !isNaN(adm0)) {
      return [adm0, adm1];
    }

    return [null, null];
  };

  componentDidMount() {
    const [adm0, adm1] = this.getLatLng();

    if (adm0 && adm1) {
      this.fetchData(adm0, adm1);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location: prevLocation } = prevProps;
    const { location } = this.props;

    if (!isEqual(location, prevLocation)) {
      const [adm0, adm1] = this.getLatLng();

      if (adm0 && adm1) {
        this.fetchData(adm0, adm1);
      }
    }
  }

  fetchData = (adm0, adm1) => {
    const { setClimateChangeDataLoading, setClimateChangeData } = this.props;

    this.cancelDataFetch();

    this.dataFetch = CancelToken.source();

    // clear data
    setClimateChangeData(
      LAYERS.reduce((all, item) => {
        all[item.id] = null;
        return all;
      }, {})
    );

    const startDateTimeParam = "1959-01-01T00:00";

    // get up to last year dec
    const endDateTime = Number(new Date().getFullYear() - 1);
    const endDateTimeParam = `${endDateTime}-12-31T00:00`;

    const requests = LAYERS.map((l) => {
      const featurePayload = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [Number(adm1), Number(adm0)],
            },
          },
        ],
      };

      return fetchGskyWps(
        l.id,
        featurePayload,
        startDateTimeParam,
        endDateTimeParam,
        null
      );
    });

    setClimateChangeDataLoading(true);

    all([...requests])
      .then(
        spread((...responses) => {
          const data = responses.reduce((all, res) => {
            all[res.identifier] = res.data;

            return all;
          }, {});

          setClimateChangeData(data);

          setClimateChangeDataLoading(false);
        })
      )
      .catch((err) => {
        setClimateChangeDataLoading(false);
      });
  };

  cancelDataFetch = () => {
    if (this.dataFetch) {
      this.dataFetch.cancel("Cancelling data fetch");
    }
  };

  render() {
    const { selectedPlaceName, data, loading } = this.props;

    return (
      <div>
        <div className="c-chart-widget">
          <Row>
            <Column>
              <Widget
                title={`Yearly Temperature Change ${selectedPlaceName}`}
                loading={loading}
                chartComponent={YearlyTemperature}
                placeName={selectedPlaceName}
                averagesData={data && data["era5monthly_temperature_2_m"]}
                anomaliesData={
                  data && data["era5monthly_temperature_2_m_anomaly"]
                }
              >
                <>
                  The top graph shows an estimate of the mean annual temperature
                  for the larger region of {selectedPlaceName}. The dashed blue
                  line is the linear climate change trend. If the trend line is
                  going up from left to right, the temperature trend is positive
                  and it is getting warmer in {selectedPlaceName} due to climate
                  change. If it is horizontal, no clear trend is seen, and if it
                  is going down, conditions in {selectedPlaceName} are becoming
                  colder over time. In the lower part the graph shows the
                  warming stripes. Each coloured stripe represents the average
                  temperature for a year - blue for colder and red for warmer
                  years.
                </>
              </Widget>
            </Column>
          </Row>
        </div>
        <div className="c-chart-widget">
          <Row>
            <Column>
              <Widget
                title={`Yearly Precipitation Change ${selectedPlaceName}`}
                loading={loading}
                chartComponent={YearlyPrecipitation}
                placeName={selectedPlaceName}
                averagesData={data && data["era5monthly_precipitation_1_day"]}
                anomaliesData={
                  data && data["era5monthly_precipitation_1_day_anomaly"]
                }
              >
                <>
                  The top graph shows an estimate of mean total precipitation
                  for the larger region of {selectedPlaceName}. The dashed blue
                  line is the linear climate change trend. If the trend line is
                  going up from left to right, the precipitation trend is
                  positive and it is getting wetter in {selectedPlaceName} due
                  to climate change. If it is horizontal, no clear trend is seen
                  and if it is going down conditions are becoming drier in{" "}
                  {selectedPlaceName} over time. In the lower part the graph
                  shows the precipitation stripes. Each coloured stripe
                  represents the total precipitation of a year - green for
                  wetter and brown for drier years.
                </>
              </Widget>
            </Column>
          </Row>
        </div>
        <div className="c-chart-widget">
          <Row>
            <Column>
              <Widget
                title={`Monthly Anomalies of Temperature and Precipitation - Climate Change ${selectedPlaceName}`}
                loading={loading}
                chartComponent={MonthlyAnomalies}
                placeName={selectedPlaceName}
                temperatureAnomaliesData={
                  data && data["era5monthly_temperature_2_m_anomaly"]
                }
                precipitationAnomaliesData={
                  data && data["era5monthly_precipitation_1_day_anomaly"]
                }
              >
                <>
                  The top graph shows the temperature anomaly for every month
                  since 1979 up to now. The anomaly tells you by how much it was
                  warmer or colder than the 30 year climate mean of 1980-2010.
                  Thus, red months were warmer and blue months were colder than
                  normal. In most locations, you will find an increase of warmer
                  months over the years, which reflects the global warming
                  associated with climate change. The lower graph shows the
                  precipitation anomaly for every month since 1979 up to now.
                  The anomaly tells you if a month had more or less
                  precipitation than the 30 year climate mean of 1980-2010.
                  Thus, green months were wetter and brown months were drier
                  than normal.
                </>
              </Widget>
            </Column>
          </Row>
        </div>
        <div className="c-chart-widget">
          <Row>
            <Column>
              <Widget
                title={`Climate Change - ${selectedPlaceName} Temperature and precipitation anomaly by month `}
                loading={loading}
                chartComponent={AnomaliesByMonth}
                placeName={selectedPlaceName}
                temperatureAnomaliesData={
                  data && data["era5monthly_temperature_2_m_anomaly"]
                }
                precipitationAnomaliesData={
                  data && data["era5monthly_precipitation_1_day_anomaly"]
                }
              >
                <>
                  This graph focuses on the specified month. If you select e.g.
                  August, then the temperature and precipitation anomaly for
                  every August since 1959 are shown. Thereby, you can see in
                  which years August was warmer or colder (drier or wetter) than
                  normal.
                </>
              </Widget>
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}

export default ClimateChangeWidgets;
