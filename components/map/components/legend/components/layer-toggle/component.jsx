import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { trackEvent } from "utils/analytics";

import Toggle from "components/ui/toggle";
import Button from "components/ui/button";
import Icon from "components/ui/icon";
import { Tooltip } from "react-tippy";
import Tip from "components/ui/tip";

import infoIcon from "assets/icons/info.svg?sprite";
import helpIcon from "assets/icons/help.svg?sprite";
import satelliteIcon from "assets/icons/satellite.svg?sprite";

import styles from "./layer-toggle.module.scss";

class LayerToggle extends PureComponent {
  render() {
    const {
      className,
      data,
      onInfoClick,
      onToggle,
      small,
      tabIndex,
      showSubtitle,
      category,
    } = this.props;
    const {
      name,
      metadata,
      layer,
      dataset,
      iso,
      active,
      color,
      citation,
      description,
      isNearRealTime,
    } = data;

    return (
      <div
        className={`${styles["c-layer-toggle"]} ${
          small ? styles["-small"] : ""
        } ${className || ""}`}
      >
        <Toggle
          theme={!small ? styles["toggle-large"] : ""}
          value={active}
          onToggle={(value) =>
            onToggle({ dataset, layer, iso, category }, value)
          }
          color={color}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <div
              className={styles.name}
              onClick={() => onToggle({ dataset, layer, iso }, !active)}
              role="button"
              tabIndex={tabIndex}
            >
              {name}
            </div>
            {((!metadata && description) ||
              (metadata && typeof metadata === "string")) && (
              <Tooltip
                theme="tip"
                arrow
                hideOnClick
                position="top"
                disabled={!description}
                html={<Tip text={description} />}
                onShow={() =>
                  trackEvent({
                    category: "Open modal",
                    action: "Hover modal button",
                    label: `${layer}: ${metadata || description}`,
                  })
                }
              >
                <Button
                  className={`${styles["theme-button-tiny"]} ${
                    styles["theme-button-grey-filled"]
                  } ${styles.square} ${styles["info-button"]} ${
                    !metadata ? styles["-help"] : ""
                  }`}
                  onClick={metadata && (() => onInfoClick(metadata))}
                >
                  <Icon icon={metadata ? infoIcon : helpIcon} />
                </Button>
              </Tooltip>
            )}
          </div>
          {citation && showSubtitle && (
            <div
              className={styles.subtitle}
              onClick={() => onToggle({ dataset, layer, iso }, !active)}
              role="button"
              tabIndex={tabIndex}
            >
              {`${citation}`}
            </div>
          )}
          {isNearRealTime && (
            <div className={styles["nrt-indicator"]}>
              <span> Near Real Time</span>
              <Icon icon={satelliteIcon} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

LayerToggle.propTypes = {
  showSubtitle: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.object,
  onInfoClick: PropTypes.func,
  onToggle: PropTypes.func,
  small: PropTypes.bool,
  tabIndex: PropTypes.number,
  category: PropTypes.string,
};

export default LayerToggle;
