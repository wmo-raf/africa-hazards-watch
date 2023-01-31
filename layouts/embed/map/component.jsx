import MapPage from "layouts/map";

import ahwLogo from "assets/logos/logo.png";

import styles from "./map.module.scss";

const MapEmbedPage = () => (
  <div className={styles["l-embed-map-page"]}>
    <a className={styles["embed-logo"]} href="/" target="_blank">
      <img src={ahwLogo} alt="Africa Hazards Watch" />
    </a>
    <MapPage embed />
  </div>
);

export default MapEmbedPage;
