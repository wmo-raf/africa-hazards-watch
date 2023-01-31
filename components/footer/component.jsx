import PropTypes from "prop-types";
import { Footer as FooterComponent } from "@erick-otenyo/hw-components";

import config from "./config";
import partners from "./partners";

import wmoLogo from "assets/logos/wmo.png";

import styles from "./footer.module.scss";

const footerBottomLinks = [
  { label: "Terms of Service", url: "https://www.icpac.net/subscribe/" },
  { label: "Privacy Policy", url: "https://www.icpac.net/subscribe/" },
];

const Footer = ({ setModalContactUsOpen }) => {
  return (
    <FooterComponent
      className={styles["c-footer"]}
      openContactUsModal={() => setModalContactUsOpen(true)}
      links={config.links}
      socialLinks={config.socialLinks}
      newsLetterSubscription={{
        url: "#",
        label: "Subscribe to the HW NewsLetter",
      }}
      partnersConfig={{
        visible: true,
        infiniteScroll: false,
        convener: {
          title: "A partnership convened by",
          url:
            "https://public.wmo.int/en/our-mandate/how-we-do-it/regional-offices/regional-office-africa",
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
