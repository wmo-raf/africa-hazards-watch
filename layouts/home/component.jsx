import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
// import YouTube from 'react-youtube';
import Link from "next/link";

import { Desktop, Mobile, Carousel, Button, Row, Column } from "hw-components";

import Cover from "components/cover";
import Icon from "components/ui/icon";
import Card from "components/ui/card";

import arrowIcon from "assets/icons/arrow-down.svg?sprite";
import profileIcon from "assets/icons/profile.svg?sprite";
import mailIcon from "assets/icons/mail.svg?sprite";

import config from "./config";
// import newsImage from "./assets/news-bg.jpg";
import bgImage from "./assets/home-bg.jpg";
import bgImageWebP from "./assets/home-bg.webp";

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
        title="Hazards Monitoring Designed for Action"
        description="Africa Hazards Watch offers data, technology and tools that empower people to better monitor hazards in Africa."
        bgImage={bgImage}
        webP={bgImageWebP}
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
      <Row>
        <Column>
          <div className="section-summary" ref={summaryEl}>
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
      <div className="section-uses">
        <h3 className="section-title">
          What can you do with Global Forest Watch?
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
    </div>
  );
};

HomePage.propTypes = {
  summary: PropTypes.array.isRequired,
  uses: PropTypes.array.isRequired,
};

HomePage.defaultProps = config;

export default HomePage;
