import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "utils/format";

import Button from "components/ui/button";

import styles from "./data-table.module.scss";

const renderString = ({ suffix, type, linkText, value }) => {
  let valueString = value || "n/a";
  if (type === "number" && value) {
    valueString = formatNumber({ num: value, unit: suffix });
  } else if (type === "link" && value && linkText) {
    valueString = (
      <a
        className={styles["table-link"]}
        href={value}
        alt="Read More"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    );
  }
  return valueString;
};

const DataTable = ({
  data,
  zoomToShape,
  onAnalyze,
  onClose,
  isPoint,
  setMapSettings,
  setAnalysisSettings,
  setMainMapSettings,
}) => {
  return (
    <div className={styles["c-data-table"]}>
      <div className={styles.table}>
        {data?.map((d) => (
          <div key={`${d.label}-${d?.value}`} className={styles.wrapper}>
            <div className={styles.label}>{d?.label}:</div>

            <div
              className={
                d?.type === "link" && d?.linkText ? styles["table-link"] : styles["value"]
              }
            >
              {renderString(d)} {d?.units}
            </div>
          </div>
        ))}
      </div>
      {!isPoint && !zoomToShape && <Button onClick={onAnalyze}>analyze</Button>}
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  zoomToShape: PropTypes.bool,
  isPoint: PropTypes.bool,
  onClose: PropTypes.func,
  onAnalyze: PropTypes.func,
  setMapSettings: PropTypes.func,
  setAnalysisSettings: PropTypes.func,
  setMainMapSettings: PropTypes.func,
};

export default DataTable;
