/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent, Fragment } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import Button from "components/ui/button";
import Icon from "components/ui/icon";

import infoIcon from "assets/icons/info.svg?sprite";

import styles from "./field-wrapper.module.scss";

class FieldWrapper extends PureComponent {
  static propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
    hidden: PropTypes.bool,
    active: PropTypes.bool,
    label: PropTypes.string,
    children: PropTypes.node,
    required: PropTypes.bool,
    infoClick: PropTypes.func,
    collapse: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
  };

  renderLabel = () => {
    const { name, label, required, infoClick, touched, error } = this.props;
    return (
      <Fragment>
        {label && (
          <label htmlFor={name}>{`${label}${required ? " *" : ""}`}</label>
        )}
        {infoClick && (
          <Button
            className={styles["info-button"]}
            theme={`${styles["theme-button-tiny"]} ${styles["theme-button-grey-filled"]} ${styles.square}`}
            onClick={(e) => {
              e.preventDefault();
              infoClick();
            }}
          >
            <Icon icon={infoIcon} className={styles["info-icon"]} />
          </Button>
        )}
        {touched && error && <span>{error}</span>}
      </Fragment>
    );
  };

  render() {
    const {
      touched,
      error,
      hidden,
      active,
      children,
      collapse,
      value,
    } = this.props;

    return (
      <div
        className={cx(
          styles["c-form-field"],
          { [styles.error]: touched && error },
          { [styles.active]: active },
          { [styles.hidden]: hidden }
        )}
      >
        {collapse ? (
          <details open={!!value}>
            <summary className={styles.label}>{this.renderLabel()}</summary>
            <div className={styles["input-field"]}>{children}</div>
          </details>
        ) : (
          <Fragment>
            <div className={styles.label}>{this.renderLabel()}</div>
            <div className={styles["input-field"]}>{children}</div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default FieldWrapper;
