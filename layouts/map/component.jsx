import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Desktop, Mobile } from "@erick-otenyo/hw-components";

import SectionsProvider from "~/providers/sections-provider";
import CountryDataProvider from "providers/country-data-provider";
import GeostoreProvider from "providers/geostore-provider";
import GeodescriberProvider from "providers/geodescriber-provider";
import DatasetsProvider from "providers/datasets-provider";
import DatasetUpdateProvider from "providers/dataset-update-provider";
import AreasProvider from "providers/areas-provider";
import MyDataProvider from "providers/mydata-provider";
import LocationProvider from "providers/location-provider";
import MyHwProvider from "providers/myhw-provider";
import LayerClipProvider from "providers/layer-clip-provider";

import ModalWelcome from "components/modals/welcome";
import MetaModal from "components/modals/meta";
import ShareModal from "components/modals/share";
import AreaOfInterestModal from "components/modals/area-of-interest";
import MyDataModal from "components/modals/my-data";

import Map from "components/map";
import MapPrompts from "components/prompts/map-prompts";
import MapMenu from "components/map-menu";

import DataAnalysisMenu from "./components/data-analysis-menu";
import MapControlButtons from "./components/map-controls";

import styles from "./map.module.scss";

class MainMapComponent extends PureComponent {
  static propTypes = {
    onDrawComplete: PropTypes.func,
    handleClickAnalysis: PropTypes.func,
    handleClickMap: PropTypes.func,
    hidePanels: PropTypes.bool,
    embed: PropTypes.bool,
  };

  render() {
    const {
      embed,
      hidePanels,
      handleClickMap,
      handleClickAnalysis,
      onDrawComplete,
    } = this.props;

    return (
      <div className={cx(styles["c-map-main"], { [styles.embed]: embed })}>
        <Desktop>
          <MapMenu className={styles["map-menu"]} embed={embed} isDesktop />
        </Desktop>
        <Mobile>
          <MapMenu className={styles["map-menu"]} embed={embed} />
        </Mobile>
        <div
          className={styles["main-map-container"]}
          role="button"
          tabIndex={0}
          onClick={handleClickMap}
        >
          <Map
            className={styles["main-map"]}
            onDrawComplete={onDrawComplete}
            onClickAnalysis={handleClickAnalysis}
          />
        </div>
        {!hidePanels && (
          <Desktop>
            <DataAnalysisMenu
              className={styles["data-analysis-menu"]}
              embed={embed}
            />
          </Desktop>
        )}
        {!embed && (
          <>
            <Desktop>
              <>
                {!embed && <MapPrompts />}
                <ModalWelcome />
                <MapControlButtons
                  className={styles["main-map-controls"]}
                  isDesktop
                />
              </>
            </Desktop>
            <Mobile>
              <>
                <MapControlButtons
                  className={styles["main-map-controls"]}
                  isDesktop={false}
                />
              </>
            </Mobile>
          </>
        )}
        <ShareModal />
        <MetaModal />
        <AreaOfInterestModal viewAfterSave clearAfterDelete canDelete />
        <MyDataModal canDelete />
        <SectionsProvider />
        <LayerClipProvider />
        <CountryDataProvider />
        <DatasetsProvider />
        <DatasetUpdateProvider />
        <GeostoreProvider />
        <GeodescriberProvider />
        <MyDataProvider />
        <AreasProvider />
        <LocationProvider />
        <MyHwProvider />
      </div>
    );
  }
}
export default MainMapComponent;
