import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ReactHtmlParser from "react-html-parser";

import WidgetCaution from "components/widget/components/widget-caution";

import styles from "./widget-footer.module.scss";

class WidgetFooter extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    simple: PropTypes.bool,
    caution: PropTypes.object,
    statements: PropTypes.array,
    locationType: PropTypes.string,
    showAttributionLink: PropTypes.bool,
  };

  render() {
    const {
      statements,
      caution,
      type,
      simple,
      locationType,
      showAttributionLink,
    } = this.props;
    const statementsMapped = statements && statements.join(" | ");
    // TODO: add statement link
    return (
      <div
        className={cx(styles["c-widget-footer"], { [styles.simple]: simple })}
      >
        {caution && (
          <WidgetCaution
            type={type}
            caution={caution}
            locationType={locationType}
          />
        )}
        {statementsMapped && !!statementsMapped.length && (
          <div className={styles.notranslate}>
            {ReactHtmlParser(statementsMapped)}
          </div>
        )}
        {showAttributionLink && (
          <span>
            Source:{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.globalforestwatch.org"
            >
              Global Forest Watch
            </a>
          </span>
        )}
      </div>
    );
  }
}

export default WidgetFooter;
