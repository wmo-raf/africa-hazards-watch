import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { trackEvent } from "utils/analytics";

import Button from "components/ui/button";
import Loader from "components/ui/loader";
import ChoseAnalysis from "components/analysis/components/chose-analysis";
import ShowAnalysis from "components/analysis/components/show-analysis";

import styles from "./analysis.module.scss";

const isServer = typeof window === "undefined";

class AnalysisComponent extends PureComponent {
  static propTypes = {
    clearAnalysis: PropTypes.func,
    className: PropTypes.string,
    endpoints: PropTypes.array,
    widgetLayers: PropTypes.array,
    loading: PropTypes.bool,
    location: PropTypes.object,
    activeArea: PropTypes.object,
    goToDashboard: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    geostoreError: PropTypes.bool,
    handleCancelAnalysis: PropTypes.func,
    handleFetchAnalysis: PropTypes.func,
    embed: PropTypes.bool,
    search: PropTypes.string,
    setSubscribeSettings: PropTypes.func,
    setAreaOfInterestModalSettings: PropTypes.func,
    setShareModal: PropTypes.func,
    checkingShape: PropTypes.bool,
    areaTooLarge: PropTypes.bool,
    uploadingShape: PropTypes.bool,
  };

  render() {
    const {
      className,
      loading,
      checkingShape,
      uploadingShape,
      location,
      search,
      activeArea,
      clearAnalysis,
      goToDashboard,
      error,
      geostoreError,
      handleCancelAnalysis,
      handleFetchAnalysis,
      setAreaOfInterestModalSettings,
      endpoints,
      widgetLayers,
      embed,
      setShareModal,
      areaTooLarge,
    } = this.props;
    const hasLayers = endpoints && !!endpoints.length;
    const hasWidgetLayers = widgetLayers && !!widgetLayers.length;

    const linkProps = {
      link: `/dashboards/${location.type}${
        location.adm0 ? `/${location.adm0}` : ""
      }${location.adm1 ? `/${location.adm1}` : ""}${
        location.adm2 ? `/${location.adm2}` : ""
      }${search ? `?${search}` : ""}`,
      ...(embed && {
        extLink:
          !isServer && window.location.href.replace("embed/map", "dashboards"),
        target: "_blank",
      }),
    };

    return (
      <Fragment>
        <div className={cx(styles["c-analysis"], className)}>
          {loading && (
            <Loader
              className={cx(styles["analysis-loader"], { fetching: loading })}
            />
          )}
          {location.type &&
            location.adm0 != undefined &&
            (loading || (!loading && error)) && (
              <div
                className={cx(styles["cancel-analysis"], { fetching: loading })}
              >
                {!loading && error && !geostoreError && (
                  <Button
                    className={styles["refresh-analysis-btn"]}
                    onClick={() => handleFetchAnalysis(endpoints)}
                  >
                    REFRESH ANALYSIS
                  </Button>
                )}
                <Button
                  className={styles["cancel-analysis-btn"]}
                  onClick={handleCancelAnalysis}
                >
                  CANCEL ANALYSIS
                </Button>
                {!loading && error && (
                  <p className={styles["error-message"]}>
                    {geostoreError
                      ? "We are having trouble getting the selected geometry. Please try again later."
                      : error}
                  </p>
                )}
              </div>
            )}
          {location.type && location.adm0 != undefined && !error && (
            <ShowAnalysis
              clearAnalysis={clearAnalysis}
              goToDashboard={goToDashboard}
              hasLayers={hasLayers}
              activeArea={activeArea}
              hasWidgetLayers={hasWidgetLayers}
              analysis
            />
          )}
          {location.type === "africa" && !location.adm0 && (
            <ChoseAnalysis
              checkingShape={checkingShape}
              uploadingShape={uploadingShape}
              handleCancelAnalysis={handleCancelAnalysis}
            />
          )}
        </div>
        {!loading &&
          !error &&
          location &&
          location.type &&
          location.adm0 != undefined && (
            <div className={styles["analysis-actions"]}>
              {location.type === "country" && !location.areaId && (
                <Button
                  className={styles["analysis-action-btn"]}
                  theme="theme-button-light"
                  {...linkProps}
                  onClick={() =>
                    trackEvent({
                      category: "Map analysis",
                      action: "User goes to dashboards",
                      label: location.adm0,
                    })
                  }
                >
                  DASHBOARD
                </Button>
              )}
              {activeArea && (
                <Button
                  className={styles["analysis-action-btn"]}
                  theme="theme-button-light"
                  link={activeArea && `/dashboards/aoi/${activeArea.id}`}
                  tooltip={{ text: "Go to Areas of Interest dashboard" }}
                >
                  DASHBOARD
                </Button>
              )}
              {location.type !== "point" &&
                (!activeArea || (activeArea && !activeArea.userArea)) && (
                  <Button
                    className={`${styles["analysis-action-btn"]} ${styles["save-to-mygfw-btn"]}`}
                    onClick={() => setAreaOfInterestModalSettings(true)}
                    disabled={areaTooLarge}
                    {...(areaTooLarge && {
                      tooltip: {
                        text:
                          "Your area is too large! Please try again with an area smaller than 1 billion hectares (approximately the size of Brazil).",
                      },
                    })}
                  >
                    save in my HW
                  </Button>
                )}
              {activeArea && activeArea.userArea && (
                <Button
                  className={styles["analysis-action-btn"]}
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
                  tooltip={{ text: "Share or embed this area" }}
                >
                  Share area
                </Button>
              )}
            </div>
          )}
      </Fragment>
    );
  }
}

export default AnalysisComponent;
