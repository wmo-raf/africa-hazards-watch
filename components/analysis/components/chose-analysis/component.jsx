import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cx from "classnames";
import { trackEvent } from "utils/analytics";
import { format } from "d3-format";

import Button from "components/ui/button";
import Icon from "components/ui/icon";
import Dropdown from "components/ui/dropdown";

import infoIcon from "assets/icons/info.svg?sprite";
import closeIcon from "assets/icons/close.svg?sprite";
import squarePointIcon from "assets/icons/square-point.svg?sprite";
import polygonIcon from "assets/icons/polygon.svg?sprite";
import rectangleIcon from "assets/icons/draw_rectangle.svg?sprite";

import UploadShapeModal from "./upload-shape-modal";
import DrawingModeSelector from "./drawing-mode-selector/component";

import styles from "./chose-analysis.module.scss";

class ChoseAnalysis extends PureComponent {
  static propTypes = {
    showDraw: PropTypes.bool,
    setAnalysisSettings: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDropRejected: PropTypes.func,
    clearAnalysisError: PropTypes.func,
    boundaries: PropTypes.array,
    activeBoundary: PropTypes.object,
    selectBoundaries: PropTypes.func,
    setMenuSettings: PropTypes.func,
    error: PropTypes.string,
    errorMessage: PropTypes.string,
    uploadConfig: PropTypes.object,
    uploading: PropTypes.bool,
    uploadStatus: PropTypes.number,
    handleCancelUpload: PropTypes.func,
    drawing: PropTypes.bool,
    setMapSettings: PropTypes.func,
    file: PropTypes.object,
  };

  state = {
    uploadModalOpen: false,
  };

  renderLayerOption = () => {
    const {
      boundaries,
      activeBoundary,
      selectBoundaries,
      setMenuSettings,
    } = this.props;
    const selectedBoundaries = activeBoundary || (boundaries && boundaries[0]);

    return (
      <div className={styles["layer-menu"]}>
        <div className={styles["layer-title"]}>Analysis on shape or:</div>
        <Dropdown
          className={`${styles["boundary-selector"]} ${styles["analysis-boundary-menu"]}`}
          options={boundaries}
          value={selectedBoundaries && selectedBoundaries.value}
          onChange={selectBoundaries}
          native
        />
      </div>
    );
  };

  renderPolygonOption = () => {
    const {
      drawing,
      setMapSettings,
      setMenuSettings,
      errorMessage,
      error,
      onDropAccepted,
      onDropRejected,
      handleCancelUpload,
      uploadConfig,
      uploading,
      uploadStatus,
      file,
      drawingMode,
    } = this.props;
    const hasError = error && errorMessage;

    const drawingModes = [
      { label: "Polygon", value: "draw_polygon", icon: polygonIcon },
      { label: "Rectangle", value: "draw_rectangle", icon: rectangleIcon },
    ];

    return (
      <div className={styles["draw-menu"]}>
        <div className={styles["draw-menu-title"]}>
          Draw in the map the area you want to analyze
        </div>
        <DrawingModeSelector
          options={drawingModes}
          activeMode={drawingMode}
          onChange={(mode) => {
            setMapSettings({ drawingMode: mode });
          }}
        />
        <Button
          className={styles["draw-menu-button"]}
          theme={drawing ? "theme-button-light wide" : "wide"}
          onClick={() => {
            setMapSettings({ drawing: !drawing });
            if (!drawing) {
              setMenuSettings({ menuSection: "" });
            }
            trackEvent({
              category: "Map analysis",
              action: "User drawn shape",
              label: drawing ? "Cancel" : "Start",
            });
          }}
        >
          {drawing ? "CANCEL" : "START DRAWING"}
        </Button>
        <div className={styles["draw-menu-separator"]}>or</div>
        <Dropzone
          className={cx(
            styles["draw-menu-input"],
            { error: error && errorMessage },
            { uploading }
          )}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          maxSize={uploadConfig.sizeLimit}
          accept={uploadConfig.types}
          multiple={false}
          disabled={uploading}
        >
          {hasError && !uploading && (
            <Fragment>
              <p className={styles["error-title"]}>{error}</p>
              <p className={`${styles["small-text"]} ${styles["error-desc"]}`}>
                {errorMessage}
              </p>
            </Fragment>
          )}
          {!hasError && !uploading && (
            <Fragment>
              <p>
                Drag and drop your <b>polygon data file</b> or click here to
                upload
              </p>
              <p className={styles["small-text"]}>
                {"Recommended file size < 1 MB"}
              </p>
            </Fragment>
          )}
          {!hasError && uploading && (
            <div className={styles["uploading-shape"]}>
              <p className={styles["file-name"]}>{file && file.name}</p>
              <p className={styles["file-size"]}>
                {`Uploading ${(file && format(".2s")(file.size)) || 0}B`}
              </p>
              <div className={styles["upload-bar"]}>
                <div className={styles["loading-bar"]}>
                  <span className={styles["full-bar"]} />
                  <span
                    className={styles["status-bar"]}
                    style={{ width: `${uploadStatus || 0}%` }}
                  />
                </div>
                <Button
                  theme="theme-button-clear"
                  className={styles["cancel-upload-btn"]}
                  onClick={handleCancelUpload}
                >
                  <Icon
                    className={styles["cancel-upload-icon"]}
                    icon={closeIcon}
                  />
                </Button>
              </div>
            </div>
          )}
        </Dropzone>
        <div className={styles.terms}>
          <div className={styles["first-term"]}>
            <p>Learn more about supported file formats</p>
            <Button
              className={styles["info-button"]}
              theme="theme-button-tiny square"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.setState({ uploadModalOpen: true });
              }}
            >
              <Icon icon={infoIcon} className={styles["info-icon"]} />
            </Button>
          </div>
          <p>
            By uploading data you agree to the{" "}
            <a href="/terms" target="_blank" rel="noopenner nofollower">
              AHW Terms of Service
            </a>
          </p>
        </div>
        <UploadShapeModal
          open={this.state.uploadModalOpen}
          onRequestClose={() => this.setState({ uploadModalOpen: false })}
        />
      </div>
    );
  };

  render() {
    const {
      showDraw,
      setMapSettings,
      setAnalysisSettings,
      clearAnalysisError,
    } = this.props;
    return (
      <div className={styles["c-chose-analysis"]}>
        <div className={styles.title}>ANALYZE DATASETS</div>
        <div className={styles.options}>
          <button
            className={cx({ [styles.selected]: !showDraw })}
            onClick={() => {
              setAnalysisSettings({ showDraw: false });
              setMapSettings({ drawing: false });
              clearAnalysisError();
            }}
          >
            <div className={styles["button-wrapper"]}>
              <Icon
                icon={squarePointIcon}
                className={styles["icon-square-point"]}
              />
              <div className={styles.label}>CLICK A LAYER ON THE MAP</div>
            </div>
          </button>
          <button
            className={cx(styles["draw-upload-tab"], { selected: showDraw })}
            onClick={() => setAnalysisSettings({ showDraw: true })}
          >
            <div className={styles["button-wrapper"]}>
              <Icon icon={polygonIcon} className={styles["icon-polygon"]} />
              <div className={styles.label}>DRAW OR UPLOAD SHAPE</div>
            </div>
          </button>
        </div>
        {showDraw ? this.renderPolygonOption() : this.renderLayerOption()}
      </div>
    );
  }
}

export default ChoseAnalysis;
