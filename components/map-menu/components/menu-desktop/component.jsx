import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { trackEvent } from "utils/analytics";

import MenuTile from "../menu-tile";

import styles from "./menu-desktop.module.scss";

class MenuDesktop extends PureComponent {
  render() {
    const {
      className,
      upperSections,
      datasetSections,
      searchSections,
      setMenuSettings,
    } = this.props;

    return (
      <div className={cx(styles["c-menu-desktop"], className)}>
        <ul className={styles["datasets-menu"]}>
          {upperSections && !!upperSections.length && (
            <div className={styles["upper-sections"]}>
              {upperSections.map((s) => (
                <MenuTile
                  className={styles["search-tile"]}
                  key={s.slug}
                  onClick={() => {
                    setMenuSettings({
                      menuSection: s.active ? "" : s.slug,
                      datasetCategory: "",
                    });
                    if (!s.active) {
                      trackEvent({
                        category: "Map menu",
                        action: "Select Map menu",
                        label: s.slug,
                      });
                    }
                  }}
                  {...s}
                />
              ))}
            </div>
          )}
          {datasetSections &&
            datasetSections
              .filter((s) => !s.hiddenMobile)
              .map((s) => (
                <MenuTile
                  className={styles["datasets-tile"]}
                  key={`${s.slug}_${s.category}`}
                  {...s}
                  label={s.category}
                  onClick={() => {
                    setMenuSettings({
                      datasetCategory: s.active ? "" : s.category,
                      menuSection: s.active ? "" : s.slug,
                    });
                    if (!s.active) {
                      trackEvent({
                        category: "Map menu",
                        action: "Select Map menu",
                        label: s.slug,
                      });
                    }
                  }}
                />
              ))}
        </ul>
        <ul className={styles["datasets-menu"]}>
          {searchSections &&
            searchSections.map((s) => (
              <MenuTile
                className={styles["search-tile"]}
                key={s.slug}
                onClick={() => {
                  setMenuSettings({
                    menuSection: s.active ? "" : s.slug,
                    datasetCategory: "",
                  });
                  if (!s.active) {
                    trackEvent({
                      category: "Map menu",
                      action: "Select Map menu",
                      label: s.slug,
                    });
                  }
                }}
                {...s}
              />
            ))}
        </ul>
      </div>
    );
  }
}

MenuDesktop.propTypes = {
  upperSections: PropTypes.array,
  datasetSections: PropTypes.array,
  searchSections: PropTypes.array,
  setMenuSettings: PropTypes.func,
  className: PropTypes.string,
};

export default MenuDesktop;
