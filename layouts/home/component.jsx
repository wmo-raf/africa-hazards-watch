import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import {
  Desktop,
  Mobile,
  Carousel,
  Button,
  Row,
  Column,
} from "@erick-otenyo/hw-components";
import ButtonComponent from "~/components/ui/button";

import Cover from "components/cover";
import Icon from "components/ui/icon";
import Card from "components/ui/card";

import weatherIcon from "assets/icons/rainfall.svg?sprite";
import forecastIcon from "assets/icons/forecast.svg?sprite";
import analyticsIcon from "assets/icons/data-analytics.svg?sprite";
import impactIcon from "assets/icons/affected-population.svg?sprite";

import arrowIcon from "assets/icons/arrow-down.svg?sprite";
import profileIcon from "assets/icons/profile.svg?sprite";

import config from "./config";
// import newsImage from "./assets/news-bg.jpg";

import globeImage from "./assets/globe.png";
import bgImage from "./assets/home-bg.png";
import bgImageWebP from "./assets/home-bg.webp";
import feedbackBg from "./assets/feedback-bg.png";

import styles from "./home.module.scss";

const { image } = styles;

const HomePage = ({ summary, uses, apps, news }) => {
  // const [showVideo, setShowVideo] = useState(false);
  const summaryEl = useRef(null);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowVideo(true);
  //   }, 5000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <div className={styles["l-home-page"]}>
      <Cover
        className={styles["home-cover"]}
        title="Climate Intelligence for Action"
        description="Africa Hazards Watch offers the latest risk information and near real-time weather and climate data to empower people and organizations to make better decisions."
        bgImage={bgImage}
        webP={bgImageWebP}
        large={true}
      >
        <ButtonComponent link="/map" className={styles["explore-btn"]}>
          EXPLORE MAP
        </ButtonComponent>
      </Cover>
      <div className={styles["section-summary"]}>
        <Row>
          <Column>
            <div ref={summaryEl}>
              <Button
                className={styles["scroll-to-btn"]}
                round
                onClick={() => {
                  window.scrollTo({
                    behavior: "smooth",
                    left: 0,
                    top: summaryEl?.current?.offsetTop,
                  });
                }}
              >
                <Icon icon={arrowIcon} />
              </Button>
              {summary && (
                <>
                  <Desktop>
                    <Carousel settings={{ dots: true }}>
                      {summary.map((c) => (
                        <Card
                          className={styles["summary-card"]}
                          classes={styles}
                          key={c.title}
                          data={{ ...c, fullSummary: true }}
                        />
                      ))}
                    </Carousel>
                  </Desktop>
                  <Mobile>
                    <Carousel settings={{ dots: true, slidesToShow: 1 }}>
                      {summary.map((c) => (
                        <Card
                          className={styles["summary-card"]}
                          classes={styles}
                          key={c.title}
                          data={{ ...c, fullSummary: true }}
                        />
                      ))}
                    </Carousel>
                  </Mobile>
                </>
              )}
            </div>
          </Column>
        </Row>
      </div>

      <div className={styles["section-features"]}>
        <Row>
          <Column width={[1, 1 / 2]}>
            <h3 className={styles["features-title"]}>
              Start Making Climate Smart Decisions
            </h3>
            <div className={styles["features-desc"]}>
              Africa Hazards Watch aggregates data from NMHSs, Regional Centers
              and Global Producing Centers to inform on climate decisions
            </div>
            <ButtonComponent>Explore Map</ButtonComponent>
          </Column>
          <Column width={[1, 1 / 2]}>
            <div className={styles["globe-wrapper"]}>
              <img className={styles["globe-img"]} src={globeImage} />
            </div>
          </Column>
        </Row>
        <div className={styles["feature-items-wrapper"]}>
          <Row>
            <Column width={[1, 1 / 4]}>
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <Icon icon={weatherIcon} />
                </div>
                <div className={styles["feature-header"]}>
                  {" "}
                  Current Conditions
                </div>
                <div className={styles["feature-detail"]}>
                  Weather conditions for different locations as reported by
                  NMHSs weather stations across Africa
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 4]}>
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <Icon icon={forecastIcon} />
                </div>
                <div className={styles["feature-header"]}> Forecasts</div>
                <div className={styles["feature-detail"]}>
                  Expected weather conditions for any location in Africa for
                  different time periods
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 4]}>
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <Icon icon={analyticsIcon} />
                </div>
                <div className={styles["feature-header"]}>
                  Historical & Projections Data
                </div>
                <div className={styles["feature-detail"]}>
                  Past observations of climatological variables and predictions
                  of future climate conditions
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 4]}>
              <div className={styles["feature-item"]}>
                <div className={styles["feature-icon"]}>
                  <Icon icon={impactIcon} />
                </div>
                <div className={styles["feature-header"]}>
                  Exposure & Impact Analysis
                </div>
                <div className={styles["feature-detail"]}>
                  Susceptibility to extreme weather events and the potential
                  consequences
                </div>
              </div>
            </Column>
          </Row>
        </div>
      </div>

      <div className={styles["section-uses"]}>
        <h3 className={styles["section-title"]}>
          What can you do with Africa Hazards Watch?
        </h3>
        {uses && (
          <Carousel
            className={styles["uses-carousel"]}
            settings={{
              slidesToShow: 1,
              dots: true,
              arrows: false,
              speed: 0,
              customPaging: (i) => (
                <div className={styles["use-user"]}>
                  <Icon className={styles["icon-user"]} icon={profileIcon} />
                  {uses[i].profile}
                </div>
              ),
            }}
          >
            {uses.map((c) => (
              <Row className={styles.uses} key={c.example}>
                <Column width={[1, 1 / 2]}>
                  <div className={styles["use-example"]}>
                    <h3 className={styles["use-header"]}>{c.heading}</h3>
                    <p className={styles["use-description"]}>{c.example}</p>
                  </div>
                </Column>
                <Column width={[1, 1 / 2]}>
                  <div
                    className={styles["use-image"]}
                    style={{ backgroundImage: `url(${c.img})` }}
                  >
                    <a
                      className={styles["use-credit"]}
                      href={c.credit.extLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.credit.name}
                    </a>
                  </div>
                </Column>
              </Row>
            ))}
          </Carousel>
        )}
      </div>

      <div className={styles["section-involve"]}>
        <Row>
          <div
            className={styles["section-involve-wrapper"]}
            style={{
              width: "100%",
              backgroundImage: `url(${feedbackBg})`,
            }}
          >
            <Column>
              <Row>
                <Column>
                  <h3 className={styles["involve-title"]}>Get Involved</h3>
                  <div className={styles["involve-text"]}>
                    Africa Hazards Watch is a User Driven system. Give us
                    feedback and let us know how to improve the system.
                  </div>
                </Column>
              </Row>

              <div className={styles["involve-actions"]}>
                <Row>
                  <Column width={[1, 1 / 5]}>
                    <ButtonComponent> Give Feedback </ButtonComponent>
                  </Column>
                  <Column width={[1, 1 / 5]}>
                    <ButtonComponent className={styles["theme-button-light"]}>
                      Contribute Data
                    </ButtonComponent>
                  </Column>
                  <Column width={[1, 1 / 5]}>
                    <ButtonComponent className={styles["theme-button-light"]}>
                      Partner with us
                    </ButtonComponent>
                  </Column>
                </Row>
              </div>
            </Column>
          </div>
        </Row>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  summary: PropTypes.array.isRequired,
  uses: PropTypes.array.isRequired,
};

HomePage.defaultProps = config;

export default HomePage;
