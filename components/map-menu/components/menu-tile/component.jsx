import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Icon from "components/ui/icon";

import styles from "./menu-tile.module.scss";

class MenuTile extends PureComponent {
  render() {
    const {
      label,
      active,
      small,
      onClick,
      loading,
      icon,
      layerCount,
      highlight,
      className,
    } = this.props;

    return (
      <li
        className={cx(
          styles["c-map-menu-tile"],
          { [styles.active]: active },
          { [styles.small]: small },
          className
        )}
      >
        <button
          className={styles["item-button"]}
          onClick={onClick}
          disabled={loading}
        >
          <div className={styles["button-wrapper"]}>
            <Icon icon={icon} className={styles["tile-icon"]} />
            <span>{label}</span>
            {(!!layerCount || highlight) && (
              <div className={styles["item-badge"]}>
                {layerCount || (highlight && "1")}
              </div>
            )}
          </div>
        </button>
      </li>
    );
  }
}

MenuTile.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  small: PropTypes.bool,
  highlight: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  layerCount: PropTypes.number,
  className: PropTypes.string,
};

export default MenuTile;
