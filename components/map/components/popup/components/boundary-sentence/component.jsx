import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import DynamicSentence from "components/ui/dynamic-sentence";
import Button from "components/ui/button";

import "./styles.scss";

const BoundarySentence = ({ sentence, onAnalyze, actionLabel, small }) => (
  <div className="c-boundary-sentence">
    <DynamicSentence className="sentence" sentence={sentence} />
    <Button theme={cx({ "theme-button-medium": small })} onClick={onAnalyze}>
      {actionLabel ? actionLabel : "analyze"}
    </Button>
  </div>
);

BoundarySentence.propTypes = {
  data: PropTypes.shape({
    level: PropTypes.number,
  }),
  sentence: PropTypes.shape({
    sentence: PropTypes.string,
    params: PropTypes.object,
  }),
  onAnalyze: PropTypes.func,
};

export default BoundarySentence;
