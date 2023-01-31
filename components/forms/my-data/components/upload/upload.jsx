import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";
import cx from "classnames";
import { format } from "d3-format";

import { cancelToken } from "utils/request";

import Button from "components/ui/button";
import Icon from "components/ui/icon";
import Loader from "components/ui/loader";
import uploadConfig from "./upload-config.json";

import closeIcon from "assets/icons/close.svg?sprite";

import styles from "./upload.module.scss";

import UploadItem from "./upload-item";

class Upload extends PureComponent {
  componentDidMount() {
    const { getMyDataUploads, activeMyDataset } = this.props;

    if (activeMyDataset && activeMyDataset.id) {
      getMyDataUploads(activeMyDataset.id);
    }
  }

  state = {
    uploadStatus: 0,
    file: null,
  };

  onDropAccepted = (files) => {
    const file = files && files[0];
    this.setState({ file, uploadStatus: 0 });

    this.handleUploadRaster(file);
  };

  onDropRejected = (files) => {
    const { setMyDataUploading } = this.props;

    const file = files && files[0];

    if (files && file && files.length > 1) {
      setMyDataUploading({
        error: "Multiple files not supported",
        errorMessage:
          "Only single files of type .nc, .geotiff, .tiff,.tif are supported.",
      });
    } else if (file && !uploadConfig.types.includes(file.type)) {
      setMyDataUploading({
        error: "Invalid file type",
        errorMessage: "Only .nc, .geotiff, .tiff, .tif are supported.",
      });
    } else if (file && file.size > uploadConfig.sizeLimit) {
      setMyDataUploading({
        error: "File too large",
        errorMessage:
          "The recommended maximum fle size is 10MB. Anything larger than that may not work properly.",
      });
    } else {
      setMyDataUploading({
        error: "Error attaching file",
        errorMessage: "Please contact us for support.",
      });
    }
  };

  handleCheckUpload = (e) => {
    this.setState({ uploadStatus: (e.loaded / e.total) * 25 });
  };

  handleCheckDownload = (e) => {
    this.setState({
      uploadStatus: 25 + (e.loaded / e.total) * 25,
    });
  };

  handleUploadRaster = (file) => {
    const { activeMyDataset } = this.props;

    if (this.uploadRaster) {
      this.uploadRaster.cancel();
    }

    this.uploadRaster = cancelToken();

    const { id } = activeMyDataset;

    this.props.uploadRaster({
      file: file,
      dataset_id: id,
      onCheckUpload: this.handleCheckUpload,
      onCheckDownload: this.handleCheckDownload,
      token: this.uploadRaster.token,
    });
  };

  handleCancelUpload = () => {
    const { setMyDataUploading } = this.props;

    if (this.uploadRaster) {
      this.uploadRaster.cancel("cancel upload rastdr");
    }

    setMyDataUploading({
      loading: false,
      error: "",
      errorMessage: "",
    });
  };

  render() {
    const {
      myDataUploads,
      activeMyDataset,
      loading,
      uploading: { loading: uploading, errorMessage, error },
      removeUpload,
    } = this.props;

    const { uploadStatus, file } = this.state;

    const activeDatasetUploads =
      activeMyDataset &&
      activeMyDataset.id &&
      myDataUploads &&
      myDataUploads[activeMyDataset.id];

    const hasError = error && errorMessage;

    if (loading) {
      return <Loader />;
    }

    const hasUploads = activeDatasetUploads && !!activeDatasetUploads.length;

    return (
      <div className={styles["upload-section"]}>
        {!hasUploads && !loading && (
          <Dropzone
            className={cx(
              styles["upload-menu-input"],
              { [styles.error]: error && errorMessage },
              { [styles.uploading]: uploading }
            )}
            onDropAccepted={this.onDropAccepted}
            onDropRejected={this.onDropRejected}
            maxSize={uploadConfig.sizeLimit}
            accept={uploadConfig.types}
            multiple={false}
            disabled={uploading}
          >
            {hasError && !uploading && (
              <>
                <p className={styles["error-title"]}>{error}</p>
                <p
                  className={`${styles["small-text"]} ${styles["error-desc"]}`}
                >
                  {errorMessage}
                </p>
              </>
            )}
            {!hasError && !uploading && (
              <>
                <p>
                  Drag and drop your <b>raster file</b> or click here to upload
                </p>
                <p className={styles["small-text"]}>
                  {"Recommended file size < 10 MB"}
                </p>
              </>
            )}
            {!hasError && uploading && (
              <div className={styles["uploading-raster"]}>
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
                    onClick={this.handleCancelUpload}
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
        )}

        {hasUploads && (
          <div className={styles["pending-uploads"]}>
            <div className={styles["pending-title"]}>UnPublished Uploads</div>
            {activeDatasetUploads &&
              !!activeDatasetUploads.length &&
              activeDatasetUploads.map((upload) => (
                <UploadItem
                  key={upload.id}
                  upload={upload}
                  onRemoveUpload={removeUpload}
                  {...this.props}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Upload;
