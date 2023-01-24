// import forestWatcherIcon from "assets/icons/forest-watcher.svg";
// import proIcon from "assets/icons/gfw-pro.svg";

import conservationOrgs from "./assets/conservation-orgs.jpg";
// import policyMakers from "./assets/policy-makers.jpg";
// import journalists from "./assets/journalists.jpg";
// import company from "./assets/company.jpg";

import card1 from "./assets/card-0.png";
import card1Webp from "./assets/card-0.webp";
import card2 from "./assets/card-1.png";
import card2Webp from "./assets/card-1.webp";
import card3 from "./assets/card-2.png";
import card3Webp from "./assets/card-2.webp";
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
      summary: "Explore our data to monitor hazards in Africa",
      buttons: [
        {
          text: "EXPLORE OUR DATA",
          link: "/map",
        },
      ],
      image: card1,
      webPImage: card1Webp,
    },
    {
      title: "Quick analysis for any location in Africa",
      summary:
        "Analyze data and investigate trends anywhere in the continent with just a few clicks.",
      buttons: [
        {
          text: "EXPLORE THE DASHBOARDS",
          link: "/dashboards/africa",
        },
      ],
      image: card3,
      webPImage: card3Webp,
    },
    {
      title: "Analyze trends using data",
      summary:
        "Monitor near real-time conditions and analyze future projections",
      buttons: [
        {
          text: "VIEW ALERTS",
          link: "/map",
        },
      ],
      image: card2,
      webPImage: card2Webp,
    },
    {
      title: "Receive email updates for your chosen location and products",
      summary:
        "View, analyze, and subscribe to get periodic alerts that show areas at risk of being affected",
      buttons: [
        {
          text: "VIEW ALERTS",
          link: "/map",
        },
      ],
      image: card2,
      webPImage: card2Webp,
    },
  ],
  uses: [
    {
      profile: "NMHSs",
      example:
        "The Amazon Conservation Association (ACA) works to protect biodiversity in the Amazon. With GLAD deforestation alerts on Global Forest Watch, we can detect illegal gold mining and logging in protected areas within days. By getting timely and precise information into the hands of policymakers, we've seen government authorities on the ground taking action within 24-48 hours of receiving an alert.",
      credit: {
        name: "MINAMPERÚ",
        extLink: "https://www.flickr.com/photos/minamperu/9966829933",
      },
      img: conservationOrgs,
    },
    {
      profile: "DRR",
      example:
        "The Amazon Conservation Association (ACA) works to protect biodiversity in the Amazon. With GLAD deforestation alerts on Global Forest Watch, we can detect illegal gold mining and logging in protected areas within days. By getting timely and precise information into the hands of policymakers, we've seen government authorities on the ground taking action within 24-48 hours of receiving an alert.",
      credit: {
        name: "MINAMPERÚ",
        extLink: "https://www.flickr.com/photos/minamperu/9966829933",
      },
      img: conservationOrgs,
    },
  ],
  apps: [],
};
