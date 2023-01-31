import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "utils/format";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { trackEvent } from "utils/analytics";
import Link from "next/link";

import Modal from "components/modal";
import Icon from "components/ui/icon";
import NoContent from "components/ui/no-content";
import Button from "components/ui/button";
import Widgets from "components/widgets";
import DynamicSentence from "components/ui/dynamic-sentence";
import DownloadData from "components/analysis/components/download-data";

import screensImg1x from "assets/images/aois/email-dashboard.png";
import screensImg2x from "assets/images/aois/email-dashboard@2x.png";
import arrowDownIcon from "assets/icons/arrow-down.svg?sprite";
import shareIcon from "assets/icons/share.svg?sprite";
import downloadIcon from "assets/icons/download.svg?sprite";

import styles from "./show-analysis.module.scss";

const isServer = typeof window === "undefined";

class ShowAnalysis extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    setShareModal: PropTypes.func,
    clearAnalysis: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
    analysisTitle: PropTypes.object,
    analysisDescription: PropTypes.object,
    handleShowDownloads: PropTypes.func,
    setMenuSettings: PropTypes.func,
    showDownloads: PropTypes.bool,
    hasLayers: PropTypes.bool,
    widgetLayers: PropTypes.array,
    downloadUrls: PropTypes.array,
    zoomLevel: PropTypes.number,
    showAnalysisDisclaimer: PropTypes.bool,
    activeArea: PropTypes.object,
    location: PropTypes.object,
  };

  state = {
    disclaimerModalOpen: false,
  };

  render() {
    const {
      setShareModal,
      setMenuSettings,
      clearAnalysis,
      data,
      loading,
      error,
      handleShowDownloads,
      showDownloads,
      downloadUrls,
      hasLayers,
      widgetLayers,
      zoomLevel,
      showAnalysisDisclaimer,
      activeArea,
      analysisTitle,
      analysisDescription,
      location,
    } = this.props;

    const isPoint = location && location.type === "point";
    const hasWidgets = widgetLayers && !!widgetLayers.length;

    return (
      <div className={styles["c-show-analysis"]}>
        <div className={styles["show-analysis-body"]}>
          {analysisTitle && !loading && !error && (
            <div className={styles["draw-title"]}>
              <Button
                className={`${styles["title-btn"]} ${styles.left}`}
                theme="theme-button-clear"
                onClick={clearAnalysis}
              >
                <Icon icon={arrowDownIcon} className={styles["icon-arrow"]} />
                {analysisTitle && (
                  <DynamicSentence
                    className={styles["analysis-title"]}
                    sentence={analysisTitle}
                  />
                )}
              </Button>
              <div className={styles["title-controls"]}>
                <Button
                  className={`${styles["title-btn"]} ${styles["title-action"]}`}
                  theme="theme-button-clear"
                  onClick={() =>
                    setShareModal({
                      title: "Share this view",
                      shareUrl:
                        !isServer &&
                        (window.location.href.includes("embed")
                          ? window.location.href.replace("/embed", "")
                          : window.location.href),
                      embedUrl:
                        !isServer &&
                        (window.location.href.includes("embed")
                          ? window.location.href
                          : window.location.href.replace("/map", "/embed/map")),
                      areaId: activeArea?.id,
                    })
                  }
                  tooltip={{ text: "Share analysis" }}
                >
                  <Icon icon={shareIcon} className={styles["icon-share"]} />
                </Button>
                {/* <Button
                  className={`${styles["title-btn"]} ${styles["title-action"]}`}
                  theme="theme-button-clear"
                  disabled={!downloadUrls || !downloadUrls.length}
                  onClick={() => {
                    handleShowDownloads(true);
                    trackEvent({
                      category: "Map analysis",
                      action: "Download",
                      label:
                        downloadUrls &&
                        downloadUrls.length &&
                        downloadUrls.map((d) => d?.label).join(", "),
                    });
                  }}
                  tooltip={{ text: "Download data" }}
                >
                  <Icon icon={downloadIcon} className={styles["icon-download"]} />
                </Button> */}
              </div>
            </div>
          )}
          {analysisDescription && !loading && !error && (
            <DynamicSentence
              className={styles["analysis-desc"]}
              sentence={analysisDescription}
            />
          )}
          <div className={styles.results}>
            {hasLayers &&
              !hasWidgets &&
              !loading &&
              !error &&
              isEmpty(data) && (
                <NoContent message="No analysis data available" />
              )}
            {!hasLayers && !hasWidgets && !loading && (
              <NoContent>Select a data layer to analyze.</NoContent>
            )}
            {(hasLayers || hasWidgets) && !loading && !error && (
              <Fragment>
                <Widgets simple analysis />
                <div className={styles.disclaimers}>
                  {zoomLevel < 11 && (
                    <p>
                      This algorithm approximates the results by sampling the
                      selected area. Results are more accurate at closer zoom
                      levels.
                    </p>
                  )}
                </div>
              </Fragment>
            )}
          </div>
          {showDownloads && (
            <DownloadData
              downloadUrls={downloadUrls}
              onClose={() => handleShowDownloads(false)}
            />
          )}
        </div>
        {(hasLayers || hasWidgets) && !loading && !error && (
          <div className={styles["save-aois-disclaimer"]}>
            {activeArea ? (
              <div className={styles.content}>
                <p>
                  To perform an in-depth analysis of this area please visit the{" "}
                  <Link
                    href="/dashboards/[[...location]]"
                    as={`/dashboards/aoi/${activeArea.id}`}
                  >
                    <a>area dashboard</a>
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <>
                {!isPoint && (
                  <div className={styles.content}>
                    <h3>Interested in this particular area?</h3>
                    <p>
                      Save this area to create a dashboard with a more in-depth
                      analysis
                    </p>
                  </div>
                )}
              </>
            )}
            {!isPoint && (
              <img
                src={screensImg1x}
                srcSet={`${screensImg1x} 1x, ${screensImg2x} 2x`}
                alt="aoi screenshots"
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ShowAnalysis;
