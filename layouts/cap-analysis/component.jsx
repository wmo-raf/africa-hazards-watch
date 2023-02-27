import React, { Component } from "react";
import { Row, Column } from "@erick-otenyo/hw-components";
import Sticky from "react-stickynode";
import cx from "classnames";
import { format } from "date-fns";

import MapCapAlert from "./components/map-capalert";
import CapDetail from "./components/cap-detail";
import CapExposureAnalysis from "./components/cap-exposure";

import "./styles.scss";

class CapAnalysisComponent extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { capUrl, fetchCapDetail } = this.props;

    const { capUrl: prevCapUrl } = prevProps;

    if (capUrl && prevCapUrl != capUrl && fetchCapDetail) {
      fetchCapDetail(capUrl);
    }
  }

  componentDidMount() {
    const { capUrl, fetchCapDetail } = this.props;

    if (capUrl && fetchCapDetail) {
      fetchCapDetail(capUrl);
    }
  }

  handleSectionChange = (newSection) => {
    const { activeSection, setCapSection } = this.props;

    if (activeSection !== newSection) {
      setCapSection(newSection);
    }
  };

  renderActiveSection = () => {
    const { activeSection, alert } = this.props;

    if (activeSection === "detail") {
      return <CapDetail alert={alert} />;
    }

    if (activeSection === "exposure") {
      return <CapExposureAnalysis />;
    }

    return <CapDetail alert={alert} />;
  };

  render() {
    const {
      alert,
      alertBbox,
      alertGeojson,
      capUrl,
      severityColor,
      activeSection,
    } = this.props;

    const { info } = alert || {};

    if (!info) {
      return null;
    }

    const sections = [
      { title: "Alert Detail", value: "detail" },
      { title: "Exposure Analysis", value: "exposure" },
    ];

    const activeCapSection =
      activeSection && sections.map((s) => s.value).includes(activeSection)
        ? activeSection
        : "detail";

    const effective = info.effective ? info.effective : alert.sent;

    const expired = new Date() > new Date(info.expires);
    const expected = new Date() < new Date(info.onset);
    const inEffect = new Date() >= new Date(info.onset) && !expired;

    return (
      <div className="l-cap-page">
        <div className="l-cap-header">
          <Row>
            <Column width={[1, 1 / 2]}>
              <div className="l-cap-map">
                <MapCapAlert
                  alertGeojson={alertGeojson}
                  alertBbox={alertBbox}
                  severityColor={severityColor}
                  padding={10}
                />
                <div className="map-legend">
                  <div>Cap Severity:</div>
                  <div className="legend-items">
                    <div className="legend-item">
                      <div
                        className="legend-color"
                        style={{ backgroundColor: "#d72f2a" }}
                      ></div>
                      <div className="legend-label">Extreme</div>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-color"
                        style={{ backgroundColor: "#fe9900" }}
                      ></div>
                      <div className="legend-label">Severe</div>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-color"
                        style={{ backgroundColor: "#ffff00" }}
                      ></div>
                      <div className="legend-label">Moderate</div>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-color"
                        style={{ backgroundColor: "#03ffff" }}
                      ></div>
                      <div className="legend-label">Minor</div>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-color"
                        style={{ backgroundColor: "#3366ff" }}
                      ></div>
                      <div className="legend-label">Unknown</div>
                    </div>
                  </div>
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 2]}>
              <h1>{info.headline}</h1>
              <div className="cap-status-wrapper">
                <div className="s-item cap-status">
                  Status:{" "}
                  {expected ? "Expected" : inEffect ? "In Effect" : "Expired"}
                </div>

                <div className="cap-time">
                  <ul>
                    <li>
                      <div className="list-dot"></div>
                      <div>
                        <span className="time-type">Issued: </span>
                        <span>{new Date(alert.sent).toUTCString()}</span>
                      </div>
                    </li>
                    <li>
                      <div className="list-dot"></div>
                      <div>
                        <span className="time-type">Effective: </span>
                        <span>{new Date(effective).toUTCString()}</span>
                      </div>
                    </li>
                    <li>
                      <div className="list-dot"></div>
                      <div>
                        <span className="time-type">Onset: </span>
                        <span>{new Date(info.onset).toUTCString()}</span>
                      </div>
                    </li>
                    <li>
                      <div className="list-dot"></div>
                      <div>
                        <span className="time-type">Expires: </span>
                        <span>{new Date(info.expires).toUTCString()}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Column>
          </Row>
          <Row className="cap-info">
            <Column width={[1 / 2, 1 / 4]}>
              <div className="s-item">
                <span className="type">Urgency: </span>
                <span> {info.urgency}</span>
              </div>
            </Column>
            <Column width={[1 / 2, 1 / 4]}>
              <div className="s-item">
                <span className="type">Severity: </span>
                <span style={{ color: severityColor }}>{info.severity}</span>
              </div>
            </Column>
            <Column width={[1 / 2, 1 / 4]}>
              <div className="s-item">
                <span className="type">Certainty: </span>
                <span>{info.certainty}</span>
              </div>
            </Column>
          </Row>

          <Sticky
            bottomBoundary=".l-cap-content"
            className="sticky-cap-content-bar"
          >
            <div className="l-cap-tabs">
              <Row>
                <Column className="content-tabs">
                  {sections.map((section) => (
                    <div
                      key={section.value}
                      className={cx("content-tab", {
                        active: section.value === activeCapSection,
                      })}
                      onClick={() => this.handleSectionChange(section.value)}
                    >
                      {section.title}
                    </div>
                  ))}
                </Column>
              </Row>
            </div>
          </Sticky>
        </div>
        <div className="l-cap-content">
          <Row>
            <Column>{this.renderActiveSection()}</Column>
          </Row>
        </div>
      </div>
    );
  }
}

export default CapAnalysisComponent;
