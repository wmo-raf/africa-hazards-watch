import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Row, Column } from "@erick-otenyo/hw-components";

import styles from "./cover.module.scss";

class Cover extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      bgImage,
      large,
      className,
      title,
      description,
      children,
      webP,
      altImageText,
    } = this.props;

    return (
      <div
        className={cx(styles["c-cover"], { [styles.large]: large }, className)}
      >
        <Row>
          <Column width={[1, 1]}>
            <div className={styles["cover-texts"]}>
              <h1
                className={cx(styles["cover-title"], {
                  [styles["-with-background"]]: !!bgImage,
                })}
              >
                {title}
              </h1>
              {Array.isArray(description) ? (
                <div className={styles.description}>{description}</div>
              ) : (
                <p className={styles.description}>{description}</p>
              )}
            </div>
            {children}
          </Column>
        </Row>
        <div>
          {bgImage && (
            <picture className={styles.picture}>
              {webP && <source srcSet={webP} type="image/webp" />}
              <source srcSet={bgImage} type="image/jpeg" />
              <img src={bgImage} alt={altImageText || "Cover image"} />
            </picture>
          )}
        </div>
      </div>
    );
  }
}

Cover.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  large: PropTypes.bool,
  bgImage: PropTypes.string,
  webP: PropTypes.string,
  altImageText: PropTypes.string,
  children: PropTypes.node,
};

export default Cover;
