import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import cx from "classnames";

import { Tooltip } from "react-tippy";
import Tip from "components/ui/tip";
import { trackEvent } from "utils/analytics";

import styles from "./button.module.scss";

const Button = (props) => {
  const {
    extLink,
    link,
    children,
    className,
    theme,
    disabled,
    active,
    onClick,
    tooltip,
    background,
    trackingData,
    target,
    tooltipPosition = "top",
  } = props;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (trackingData) {
      const { event, label } = trackingData;
      trackEvent(event, { label });
    }
  };

  let button = null;
  if (extLink) {
    button = (
      <a
        className={cx(
          styles["c-button"],
          theme,
          className,
          { [styles.disabled]: disabled },
          { [styles["--active"]]: active }
        )}
        href={extLink}
        target={target || "_blank"}
        rel="noopener"
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </a>
    );
  } else if (link) {
    button = (
      <Link href={link}>
        <a>
          <button
            className={cx(
              styles["c-button"],
              theme,
              className,
              { [styles.disabled]: disabled },
              { [styles["--active"]]: active }
            )}
            disabled={disabled}
            onClick={handleClick}
          >
            {children}
          </button>
        </a>
      </Link>
    );
  } else {
    button = (
      <button
        className={cx(
          styles["c-button"],
          theme,
          className,
          { [styles.disabled]: disabled },
          { [styles["--active"]]: active }
        )}
        onClick={handleClick}
        disabled={disabled}
        style={background && { background }}
      >
        <div className={styles["button-wrapper"]}>{children}</div>
      </button>
    );
  }

  if (tooltip) {
    return (
      <Tooltip
        theme="tip"
        position={tooltipPosition}
        arrow
        touchHold
        html={<Tip text={tooltip.text} />}
        hideOnClick
        {...tooltip}
      >
        {button}
      </Tooltip>
    );
  }
  return button;
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  extLink: PropTypes.string,
  tooltip: PropTypes.object,
  trackingData: PropTypes.object,
  buttonClicked: PropTypes.func,
  background: PropTypes.string,
  target: PropTypes.string,
  tooltipPosition: PropTypes.string,
};

export default Button;
