import React from "react";
import PropTypes from "prop-types";

import Card from "components/ui/cap-alert-card";

import "./styles.scss";

const CapAlertCard = ({ data, setMapSettings }) => {
  console.log(data);

  return (
    <Card
      className="c-cap-alert-card"
      theme="theme-card-small"
      clamp={5}
      data={{
        ...data,
      }}
    />
  );
};

CapAlertCard.propTypes = {
  data: PropTypes.shape({
    buttons: PropTypes.array,
    bbox: PropTypes.array,
  }),
  setMapSettings: PropTypes.func,
};

export default CapAlertCard;
