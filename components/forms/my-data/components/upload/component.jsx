import React, { PureComponent } from "react";

import { trackEvent } from "utils/analytics";
import SubnavMenu from "components/subnav-menu";

import Upload from "./upload";
import RasterFiles from "./rasters";

import "./styles.scss";

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
        label: "Dataset",
        active: uploadSection === "dataset",
        onClick: () => {
          setMyDataSettings({ uploadSection: "dataset" });
        },
      },
      {
        label: "Upload",
        active: uploadSection === "upload",
        onClick: () => {
          setMyDataSettings({ uploadSection: "upload" });
          trackEvent({
            category: "My Data Upload",
            action: "Select upload section",
            label: "My Data",
          });
        },
        Component: Upload,
      },
      {
        label: "Published",
        active: uploadSection === "files",
        onClick: () => {
          setMyDataSettings({ uploadSection: "files" });
          trackEvent({
            category: "My Data Upload",
            action: "Select files section",
            label: "My Data",
          });
        },
        Component: RasterFiles,
      },
      {
        label: "Style",
        active: uploadSection === "style",
        onClick: () => {
          setMyDataSettings({ uploadSection: "style" });
        },
      },
      {
        label: "Analysis Settings",
        active: uploadSection === "analysis",
        onClick: () => {
          setMyDataSettings({ uploadSection: "analysis" });
        },
      },
    ];

    const { datasetDetails: d } = activeMyDataset || {};

    const activeSection = sections.find((s) => s.Component && s.active);

    const ActiveSectionComponent = activeSection && activeSection.Component;

    return (
      <div className="c-mydata-upload">
        <h1>{title}</h1>

        {/* {d && (
          <div className="dataset-details">
            <div className="dataset-property">
              <div className="dataset-prop-name">Dataset Name: </div>
              <div className="dataset-prop-value">{d.name}</div>
            </div>
            <div className="dataset-property">
              <div className="dataset-prop-name">Created on: </div>
              <div className="dataset-prop-value">{d.created_on}</div>
            </div>
          </div>
        )} */}
        <div className="upload-sections-wrapper">
          <SubnavMenu
            links={sections}
            className="my-data-upload-menu"
            theme="theme-subnav-small-light"
          />
          <div className="content">
            <div className="row">
              <div className="column small-12">
                <div className="u-section">
                  {activeSection ? (
                    <ActiveSectionComponent {...this.props} />
                  ) : null}
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
