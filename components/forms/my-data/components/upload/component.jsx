import React, { PureComponent } from "react";

import { trackEvent } from "utils/analytics";
import SubnavMenu from "components/subnav-menu";

import Upload from "./upload";
import RasterFiles from "./rasters";

import styles from "./upload.module.scss";

class MyDataUpload extends PureComponent {
  componentDidMount() {
    const {} = this.props;
  }

  renderFiles = () => {
    return <div>Files List Here</div>;
  };

  render() {
    const {
      activeMyDataset,
      title,
      uploadSection,
      setMyDataSettings,
    } = this.props;

    const sections = [
      {
        label: "Uploads",
        active: uploadSection === "upload",
        onClick: () => {
          setMyDataSettings({ uploadSection: "upload" });
          trackEvent({
            category: "My Data Upload",
            action: "Select upload section",
            label: "My Data",
          });
        },
      },
      {
        label: "Published Raster Files",
        active: uploadSection === "files",
        onClick: () => {
          setMyDataSettings({ uploadSection: "files" });
          trackEvent({
            category: "My Data Upload",
            action: "Select files section",
            label: "My Data",
          });
        },
      },
    ];

    const { datasetDetails: d } = activeMyDataset || {};

    return (
      <div className={styles["c-mydata-upload"]}>
        <h1>{title}</h1>

        {d && (
          <div className={styles["dataset-details"]}>
            <div className={styles["dataset-property"]}>
              <div className={styles["dataset-prop-name"]}>Dataset Name: </div>
              <div className={styles["dataset-prop-value"]}>{d.name}</div>
            </div>
            <div className={styles["dataset-property"]}>
              <div className={styles["dataset-prop-name"]}>Created on: </div>
              <div className={styles["dataset-prop-value"]}>{d.created_on}</div>
            </div>
          </div>
        )}
        <div className={styles["upload-sections-wrapper"]}>
          <SubnavMenu
            links={sections}
            className={styles["my-data-upload-menu"]}
            theme="theme-subnav-small-light"
          />

          <div className={styles.content}>
            <div className={styles.row}>
              <div className={`${styles.column} ${styles["small-12"]}`}>
                <div className={styles["u-section"]}>
                  {uploadSection === "upload" ? (
                    <Upload {...this.props} />
                  ) : (
                    <RasterFiles {...this.props} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyDataUpload;
