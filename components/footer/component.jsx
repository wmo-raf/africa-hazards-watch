import PropTypes from "prop-types";
import { Footer as FooterComponent } from "@erick-otenyo/hw-components";

import config from "./config";
import partners from "./partners";

import wmoLogo from "assets/logos/logo.png";

import "./styles.scss";

const footerBottomLinks = [
  { label: "Terms of Service", url: "/terms" },
  { label: "Privacy Policy", url: "/privacy" },
];

const Footer = ({ setModalContactUsOpen }) => {
  return (
    <FooterComponent
      className="c-footer"
      openContactUsModal={() => setModalContactUsOpen(true)}
      links={config.links}
      socialLinks={config.socialLinks}
      newsLetterSubscription={{
        url: "#",
        label: "Contact Us",
      }}
      partnersConfig={{
        visible: true,
        infiniteScroll: false,
        convener: {
          title: "A continental partnership convened by",
          url: "#",
          logo: wmoLogo,
          label: "WMO",
        },
        partners: partners,
      }}
      footerBottomLinks={footerBottomLinks}
    />
  );
};

Footer.propTypes = {
  setModalContactUsOpen: PropTypes.func,
};

export default Footer;
