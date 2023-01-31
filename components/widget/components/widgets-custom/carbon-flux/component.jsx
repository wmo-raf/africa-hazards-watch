import React from "react";

import Emissions from "assets/icons/widgets/carbon-flux/emissions.svg";
import Removals from "assets/icons/widgets/carbon-flux/removals.svg";

import styles from "./carbon-flux.module.scss";

export const Component = () => (
  <div className={styles["c-carbon-flux-image-component"]}>
    <img className={styles.image} src={Removals} alt="Removals" />
    <img className={styles.image} src={Emissions} alt="Emissions" />
  </div>
);

export default Component;