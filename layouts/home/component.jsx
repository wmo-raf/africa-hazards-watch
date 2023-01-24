import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
// import YouTube from 'react-youtube';
import Link from "next/link";

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

import arrowIcon from "assets/icons/arrow-down.svg?sprite";
import profileIcon from "assets/icons/profile.svg?sprite";
import mailIcon from "assets/icons/mail.svg?sprite";

import config from "./config";
// import newsImage from "./assets/news-bg.jpg";
import bgImage from "./assets/home-bg.jpg";
import globeImage from "./assets/globe.png";
import bgImageWebP from "./assets/home-bg.webp";
import satDish from "./assets/satellite-dish.jpeg";

import "./styles.scss";

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
    <div className="l-home-page">
      <Cover
        className="home-cover"
        title="Climate Intelligence for Action"
        description="Africa Hazards Watch offers the latest risk information and near real-time weather and climate data to empower people and organizations to make better decisions."
        bgImage={bgImage}
        // webP={bgImageWebP}
        large
      >
        <>
          <Link href="/subscribe">
            <a className="subscribe-btn">
              <Button round className="subscribe-icon">
                <Icon icon={mailIcon} />
              </Button>
              <p className="subscribe-msg">SUBSCRIBE TO THE AHW NEWSLETTER</p>
            </a>
          </Link>
        </>
      </Cover>
      <div className="section-summary">
        <Row>
          <Column>
            <div ref={summaryEl}>
              <Button
                className="scroll-to-btn"
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
                          className="summary-card"
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
                          className="summary-card"
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

      <div className="section-features">
        <Row>
          <Column width={[1, 1 / 2]}>
            <h3 className="features-title">
              Start Making Climate Smart Decisions
            </h3>
            <div className="features-desc">
              Africa Hazards Watch aggregates data from NMHSs, Regional Centers
              and Global Producing Centers to inform on climate decisions
            </div>
            <ButtonComponent>Explore Map</ButtonComponent>
          </Column>
          <Column width={[1, 1 / 2]}>
            <div className="globe-wrapper">
              <img className="globe-img" src={globeImage} />
            </div>
          </Column>
        </Row>
        <div className="feature-items-wrapper">
          <Row>
            <Column width={[1, 1 / 4]}>
              <div className="feature-item">
                <div className="feature-icon">
                  <Icon icon={profileIcon} />
                </div>
                <div className="feature-header"> Current Conditions</div>
                <div className="feature-detail">
                  Planet Monitoring passively images the Earth’s landmass every
                  day, empowering you with comprehensive, accurate data about
                  our changing planet.
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 4]}>
              <div className="feature-item">
                <div className="feature-icon">
                  <Icon icon={arrowIcon} />
                </div>
                <div className="feature-header"> Forecasts</div>
                <div className="feature-detail">
                  Planet Monitoring passively images the Earth’s landmass every
                  day, empowering you with comprehensive, accurate data about
                  our changing planet.
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 4]}>
              <div className="feature-item">
                <div className="feature-icon">
                  <Icon icon={profileIcon} />
                </div>
                <div className="feature-header">
                  {" "}
                  Historical & Projections Data
                </div>
                <div className="feature-detail">
                  Planet Monitoring passively images the Earth’s landmass every
                  day, empowering you with comprehensive, accurate data about
                  our changing planet.
                </div>
              </div>
            </Column>
            <Column width={[1, 1 / 4]}>
              <div className="feature-item">
                <div className="feature-icon">
                  <Icon icon={profileIcon} />
                </div>
                <div className="feature-header">
                  {" "}
                  Exposure & Impact Analysis
                </div>
                <div className="feature-detail">
                  Planet Monitoring passively images the Earth’s landmass every
                  day, empowering you with comprehensive, accurate data about
                  our changing planet.
                </div>
              </div>
            </Column>
          </Row>
        </div>
      </div>
      <div className="section-uses">
        <h3 className="section-title">
          What can you do with Africa Hazards Watch?
        </h3>
        {uses && (
          <Carousel
            className="uses-carousel"
            settings={{
              slidesToShow: 1,
              dots: true,
              arrows: false,
              speed: 0,
              customPaging: (i) => (
                <div className="use-user">
                  <Icon className="icon-user" icon={profileIcon} />
                  {uses[i].profile}
                </div>
              ),
            }}
          >
            {uses.map((c) => (
              <Row className="uses" key={c.example}>
                <Column width={[1, 1 / 2]}>
                  <p className="use-example">
                    <i>
                      <span>“</span>
                      {c.example}
                      <span>”</span>
                    </i>
                  </p>
                </Column>
                <Column width={[1, 1 / 2]}>
                  <div
                    className="use-image"
                    style={{ backgroundImage: `url(${c.img})` }}
                  >
                    <a
                      className="use-credit"
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
      <div
        className="section-involve"
        style={{ backgroundImage: `url(${satDish})` }}
      >
        <Row>
          <Column>
            <h3 className="involve-title">Get Involved</h3>
            <div className="involve-text">
              Africa Hazards Watch is a User Driven system. Give us feedback and
              let us know how to improve the system.
            </div>
          </Column>
        </Row>

        <div className="involve-actions">
          <Row>
            <Column width={[1, 1 / 5]}>
              <ButtonComponent> Give Feedback </ButtonComponent>
            </Column>
            <Column width={[1, 1 / 5]}>
              <ButtonComponent className="theme-button-light">
                Contribute Data
              </ButtonComponent>
            </Column>
            <Column width={[1, 1 / 5]}>
              <ButtonComponent className="theme-button-light">
                Partner with us
              </ButtonComponent>
            </Column>
          </Row>
        </div>
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
