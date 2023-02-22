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

import Cover from "components/cover";
import Icon from "components/ui/icon";

import coverImg from "./assets/cover.png";
import section1Img from "./assets/section-1.png";
import section2Img from "./assets/section-2.png";
import section3Img from "./assets/section-3.png";
import section4Img from "./assets/section-4.png";
import section5Img from "./assets/section-5.png";
import section6Img from "./assets/section-6.png";

import timeseriesIcon from "assets/icons/bars.svg?sprite";
import realtimeIcon from "assets/icons/realtime.svg?sprite";
import shortTermForecastIcon from "assets/icons/short-forecast.svg?sprite";
import projectionsIcon from "assets/icons/climate-projections.svg?sprite";

import exposureIcon from "assets/icons/affected-population.svg?sprite";
import locationIcon from "assets/icons/location.svg?sprite";
import mailIcon from "assets/icons/mail.svg?sprite";

import capIcon from "assets/icons/alert.svg?sprite";
import infrastructureIcon from "assets/icons/infrastructure.svg?sprite";
import extremeTempIcon from "assets/icons/extreme-temperature.svg?sprite";
import droughtIcon from "assets/icons/drought.svg?sprite";
import floodIcon from "assets/icons/floods.svg?sprite";
import climateDataIcon from "assets/icons/rainfall.svg?sprite";
import foodInsecIcon from "assets/icons/food-insecurity.svg?sprite";
import pestsIcon from "assets/icons/locust.svg?sprite";
import climateChangeIcon from "assets/icons/climate-change.svg?sprite";
import cropsICon from "assets/icons/environment_new.svg?sprite";
import cyclonesIcon from "assets/icons/cyclone.svg?sprite";

import "./styles.scss";

const section7IconItems = [
  {
    id: "timeseries",
    title: "Time series",
    icon: timeseriesIcon,
    desc: "Discover trends and patterns across sectors",
  },
  {
    id: "realtime",
    title: "Real time data",
    icon: realtimeIcon,
    desc: "Explore the latest data for any location",
  },
  {
    id: "shortforecast",
    title: "Short term forecasts",
    icon: shortTermForecastIcon,
    desc: "The best forecasts by national, regional and global institutions",
  },
  {
    id: "projections",
    title: "Long term projections",
    icon: projectionsIcon,
    desc: "Discover climate change projections for any location in Africa",
  },
];

const section8IconItems = [
  {
    id: "exposure",
    title: "Exposure Data",
    icon: exposureIcon,
    desc:
      "High resolution exposure information to understand socio-economic impacts",
  },
  {
    id: "location",
    title: "Data for any location in Africa",
    icon: locationIcon,
    desc: "Get the best climate information for any location in Africa ",
  },
  {
    id: "viz",
    title: "User friendly visualisations",
    icon: timeseriesIcon,
    desc: "User friendly visualisations to identify trends  and make decisions",
  },
  {
    id: "email",
    title: "Email updates ",
    icon: mailIcon,
    desc:
      "User-friendly information for any parameter of choice directly to your email inbox",
  },
];

const section9IconItems = [
  {
    id: "cap",
    title: "Cap Alerts ",
    icon: capIcon,
  },
  {
    id: "infrastructure",
    title: "Key Infrastructure ",
    icon: infrastructureIcon,
  },
  {
    id: "socioeconomic",
    title: "Socio-economic Data ",
    icon: exposureIcon,
  },
  {
    id: "extremetemp",
    title: "Extreme Temperature",
    icon: extremeTempIcon,
  },
  {
    id: "drought",
    title: "Drought",
    icon: droughtIcon,
  },
  {
    id: "floods",
    title: "Floods Risk",
    icon: floodIcon,
  },
  {
    id: "climatedata",
    title: "Climate Data and Forecasts",
    icon: climateDataIcon,
  },
  {
    id: "foodinsecurity",
    title: "Food Insecurity",
    icon: foodInsecIcon,
  },
  {
    id: "pests",
    title: "Pests",
    icon: pestsIcon,
  },
  {
    id: "climatechange",
    title: "Climate Change",
    icon: climateChangeIcon,
  },
  {
    id: "crops",
    title: "Crop Conditions",
    icon: cropsICon,
  },
  {
    id: "cyclones",
    title: "Cyclones",
    icon: cyclonesIcon,
  },
];

const ValuePage = ({}) => {
  return (
    <div className="l-value-page">
      <Cover
        className="value-cover"
        title="Hazards Watch"
        description="Supporting tailored, impact based climate services in Africa"
        bgImage={coverImg}
        // webP={coverImg}
        large
      ></Cover>
      <div className="section section-1">
        <Row className="row">
          <Column width={[1, 1 / 2]}>
            <div className="quote">
              <div>
                <b>A one-stop-shop for </b> weather, climate, risks and
                socio-economic information to facilitate{" "}
                <b>climate-smart decisions</b>
              </div>
            </div>
          </Column>
          <Column width={[1, 1 / 2]} className="img-column">
            <img src={section1Img} />
          </Column>
        </Row>
      </div>
      <div className="section section-2">
        <Row className="row">
          <Column width={[1, 1 / 2]} className="img-column">
            <img src={section2Img} />
          </Column>
          <Column width={[1, 1 / 2]}>
            <div className="section-list">
              <div className="list-title">
                A one-stop shop for climate and risk information
              </div>
              <ul className="list-items">
                <li>Strengthens coordination and partnerships </li>
                <li>
                  One centralized platform for (NMHSs) to access key information
                  from specialized systems
                </li>
                <li>
                  Supports the United Nations Initiative on Early Warning for
                  All
                </li>
                <li>
                  Supports the digital transformation of National Meteorological
                  and Hydrological Services (NMHSs), Regional Specialized
                  Meteorological Centres (RSMCs) and Regional Climate Centers
                </li>
                <li>
                  Supports implementation of WMO Programmes (GBON, RBON, SOFF,
                  GMAS, CAP, Impact-based forecasts) and Coordination Mechanism
                </li>
              </ul>
            </div>
          </Column>
        </Row>
      </div>
      <div className="section section-3">
        <Row className="row">
          <Column width={[1, 1 / 2]}>
            <div className="section-list">
              <div className="list-title">
                Visualise real time observation data
              </div>
              <div className="list-subtitle">
                The increased intensity and frequency of climate extremes and
                Africa's vulnerability call for robust climate data
                visualisation systems.
              </div>
              <ul className="list-items">
                <li>Visualise 3 hourly data from your synoptic stations </li>
                <li>Use Machine Learning to analyse weather patterns</li>
                <li>Visualise radiosonde data</li>
                <li>Visualise AMDAR data</li>
                <li>Visualise analysis from Global or NWP Centers</li>
              </ul>
            </div>
          </Column>
          <Column width={[1, 1 / 2]} className="img-column">
            <img src={section3Img} />
          </Column>
        </Row>
      </div>
      <div className="section section-4">
        <Row className="row">
          <Column width={[1, 1 / 2]} className="img-column">
            <img src={section4Img} />
          </Column>
          <Column width={[1, 1 / 2]}>
            <div className="section-list">
              <div className="list-title">Improve impact based services</div>
              <div className="list-subtitle">
                Having multi-sectoral climate information and early warnings is
                key to making decisions that support adaptation and mitigation
                of climate change.
              </div>
              <ul className="list-items">
                <li>Provide decision ready multi-sectoral information</li>
                <li>Enable climate smart decisions</li>
                <li>Open source and built on geo standards</li>
                <li>Supports the adoption of CAP</li>
                <li>
                  Supports provision of impact-based forecasts and forecast
                  based finance
                </li>
              </ul>
            </div>
          </Column>
        </Row>
      </div>
      <div className="section section-5">
        <Row className="row">
          <Column width={[1, 1 / 2]}>
            <div className="section-list">
              <div className="list-title">
                Access, analyze and compare forecasts
              </div>
              <ul className="list-items">
                <li>
                  Access and compare forecasts by Global Producing Centers,
                  Regional Specialized Meteorological Centres (RSMCs) and
                  Regional Climate Centers (RCCs)
                </li>
                <li>Upload and visualise your in-house forecast </li>
                <li>
                  Negotiate access to higher resolution and ensemble forecasts
                  from Global Producing Centers
                </li>
                <li>Implement recommendations of WMO symposium</li>
                <li>Evaluate the skill of your forecasts</li>
              </ul>
            </div>
          </Column>
          <Column width={[1, 1 / 2]} className="img-column">
            <img src={section5Img} />
          </Column>
        </Row>
      </div>
      <div className="section section-6">
        <Row className="row">
          <Column width={[1, 1 / 2]} className="img-column">
            <img src={section6Img} />
          </Column>
          <Column width={[1, 1 / 2]}>
            <div className="section-list">
              <div className="list-title">Improve data sharing</div>
              <div className="list-subtitle">
                Data is essential to improve global models and forecasts to
                predict climate extremes. Visualizing data incentivizes
                data-sharing.
              </div>
              <ul className="list-items">
                <li>Increase utilisation and assimilation of data</li>
                <li>Encourage data sharing</li>
                <li>Monitor data shared to the GTS</li>
                <li>Implement recommendations of WMO symposium</li>
                <li>
                  Evaluate gaps in spatial coverage and support Global Basic
                  Observing Network (GBON) implementation
                </li>
              </ul>
            </div>
          </Column>
        </Row>
      </div>
      <div className="section section-7">
        <Row className="row">
          <Column width={[1, 1 / 2]}>
            <div className="section-list">
              <div className="list-title">
                The best data for climate-smart decisions in Africa
              </div>
              <div className="list-subtitle">
                Hazards Watch enables National Meteorological and Hydrological
                Services to provide tailored multi-sectoral information. It
                supports users in understanding trends and patterns and helps
                make climate-informed decisions based on historical data,
                short-term forecasts, and long-term climate projections.
              </div>
            </div>
          </Column>
          <Column width={[1, 1 / 2]}>
            <Row className="icon-items">
              {section7IconItems.map((item) => (
                <Column
                  width={[1, 1 / 2]}
                  key={item.id}
                  className="icon-item-wrapper"
                >
                  <div className="icon-wrapper">
                    <Icon icon={item.icon} />
                  </div>
                  <div className="icon-item-title">{item.title}</div>
                  <div className="icon-item-desc">{item.desc}</div>
                </Column>
              ))}
            </Row>
          </Column>
        </Row>
      </div>
      <div className="section section-8">
        <div className="section-title">Features</div>
        <Row className="icon-items">
          {section8IconItems.map((item) => (
            <Column
              width={[1, 1 / 2, 1 / 4]}
              key={item.id}
              className="icon-item-wrapper"
            >
              <div className="icon-wrapper">
                <Icon icon={item.icon} />
              </div>
              <div className="icon-item-title">{item.title}</div>
              <div className="icon-item-desc">{item.desc}</div>
            </Column>
          ))}
        </Row>
      </div>
      <div className="section section-9">
        <div className="section-title">What's Included</div>
        <Row className="icon-items">
          {section9IconItems.map((item) => (
            <Column
              width={[1 / 2, 1 / 2, 1 / 4]}
              key={item.id}
              className="icon-item-wrapper"
            >
              <div className="icon-wrapper">
                <Icon icon={item.icon} />
              </div>
              <div className="icon-item-title">{item.title}</div>
            </Column>
          ))}
        </Row>
      </div>
    </div>
  );
};

ValuePage.propTypes = {};

export default ValuePage;
