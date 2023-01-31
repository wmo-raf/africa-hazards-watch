import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Card from "components/ui/cap-alert-card";

import styles from "./cap-alert-card.module.scss";

class CapAlertCard extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Card
        className={styles["c-cap-alert-card"]}
        theme={styles["theme-card-small"]}
        clamp={5}
        data={{
          ...data,
        }}
      />
    );
  }
}

CapAlertCard.propTypes = {
  data: PropTypes.object,
};

export default CapAlertCard;
