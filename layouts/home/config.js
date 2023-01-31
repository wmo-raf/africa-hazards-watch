// import forestWatcherIcon from "assets/icons/forest-watcher.svg?sprite";
// import proIcon from "assets/icons/gfw-pro.svg?sprite";

import conservationOrgs from "./assets/conservation-orgs.jpg";
import NMHSs from "./assets/nmhss.png";
import drr from "./assets/drr.png";
// import policyMakers from "./assets/policy-makers.jpg";
// import journalists from "./assets/journalists.jpg";
// import company from "./assets/company.jpg";

import cardAlert from "./assets/card-alerts.png";
import cardAlertWebp from "./assets/card-alerts.webp";

import cardTopic from "./assets/card-topic.png";
import cardTopicWebp from "./assets/card-topic.webp";

import cardClimate from "./assets/card-climate.png";
import cardClimateWebp from "./assets/card-climate.webp";

import cardDashboard from "./assets/card-dashboard.png";
import cardDashboardWebp from "./assets/card-dashboard.webp";

import card4 from "./assets/card-3.png";
import card4Webp from "./assets/card-3.webp";
import card5 from "./assets/card-4.png";
import card5Webp from "./assets/card-4.webp";

// import forestWatcherImage from "./assets/forestwatcher@2x.jpg";
// import proImage from "./assets/pro-bg@2x.png";

export default {
  summary: [
    {
      title: "Monitor warnings, alerts, risks and potential hazards",
      summary:
        "Explore and visualize weather alerts for severe weather conditions as published by NMHSs in Africa.",
      buttons: [
        {
          text: "VIEW CURRENT ALERTS",
          link: "/map",
        },
      ],
      image: cardAlert,
      webPImage: cardAlertWebp,
    },
    {
      title: "Quick analysis for any location in Africa",
      summary:
        "Analyze by an administrative boundary, a specific point or upload/draw your custom area on the map",
      buttons: [
        {
          text: "EXPLORE",
          link: "/map",
        },
      ],
      image: cardClimate,
      webPImage: cardClimateWebp,
    },
    {
      title: "Analyze climate change for any location in Africa",
      summary:
        "Explore historical data, current conditions and future projected climate conditions for any location",
      buttons: [
        {
          text: "VIEW CLIMATE CHANGE DATA",
          link: "/map",
        },
      ],
      image: cardTopic,
      webPImage: cardTopicWebp,
    },
    {
      title: "Receive email updates for your chosen location and products",
      summary:
        "View, analyze, and subscribe to get periodic notifications for areas and products you are interested in",
      buttons: [
        {
          text: "SIGN IN TO MY HW",
          link: "/my-hw",
        },
      ],
      image: cardDashboard,
      webPImage: cardDashboardWebp,
    },
  ],
  uses: [
    {
      profile: "NMHSs",
      heading: "National Meteorological and Hydrological Services",
      example:
        "Upload and visualize local Numerical Weather Prediction data and compare with data from Global Producing Centers",
      credit: {
        name: "AHW",
        // extLink: "",
      },
      img: NMHSs,
    },
    {
      profile: "DRR",
      heading: "Disaster Risk Reduction Agencies",
      example:
        "Monitor and forecast hazards in the region, and provide early warning to communities and government agencies to help them prepare for and respond to potential disasters",
      credit: {
        name: "AHW",
        // extLink: "/map",
      },
      img: drr,
    },
  ],
  apps: [],
};
