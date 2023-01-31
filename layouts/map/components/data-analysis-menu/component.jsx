import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import MapLegend from "components/map/components/legend";
import Analysis from "components/analysis";
import SubNavMenu from "components/subnav-menu";

import styles from "./data-analysis-menu.module.scss";

class DataAnalysisMenu extends PureComponent {
  static propTypes = {
    showAnalysis: PropTypes.bool,
    hidden: PropTypes.bool,
    className: PropTypes.string,
    menuSection: PropTypes.object,
    links: PropTypes.array,
    setMainMapSettings: PropTypes.func,
    setMapSettings: PropTypes.func,
    clearAnalysisError: PropTypes.func,
    embed: PropTypes.bool,
  };

  getLinks = () => {
    const {
      links,
      clearAnalysisError,
      setMainMapSettings,
      setMapSettings,
      showAnalysis,
      hidden,
    } = this.props;

    return links.map((l) => ({
      ...l,
      onClick: () => {
        setMainMapSettings({
          showAnalysis: l.showAnalysis,
          hideLegend:
            (showAnalysis && l.active && !hidden) ||
            (!showAnalysis && l.active && !hidden),
        });
        setMapSettings({ drawing: false });
        clearAnalysisError();
      },
    }));
  };

  render() {
    const { className, showAnalysis, menuSection, hidden, embed } = this.props;

    return (
      <div
        className={cx(
          styles["c-data-analysis-menu"],
          styles["map-tour-legend"],
          { [styles.relocate]: !!menuSection && menuSection.Component },
          { [styles.big]: menuSection && menuSection.large },
          { [styles.embed]: embed },
          className
        )}
      >
        <SubNavMenu
          className={styles.nav}
          theme="theme-subnav-plain"
          links={this.getLinks()}
          checkActive
        />
        {!hidden && !showAnalysis && (
          <MapLegend className={styles["map-legend"]} />
        )}
        {/* {!hidden && !showAnalysis && <SatelliteBasemaps />} */}
        {!hidden && showAnalysis && (
          <Analysis className={styles["map-analysis"]} />
        )}
      </div>
    );
  }
}

export default DataAnalysisMenu;
