import React from "react";
import PropTypes from "prop-types";

import styles from "./area-sentence.module.scss";

const AreaSentence = ({ data }) =>
  data?.name ? (
    <div className={styles["c-area-sentence"]}>
      <p>{data?.name}</p>
    </div>
  ) : null;

AreaSentence.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default AreaSentence;
