import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import SubnavMenu from "components/subnav-menu";
import CreateEdit from "./components/create-edit";
import Upload from "./components/upload";
import PublishedList from "./components/published-list";
import DatasetStyle from "./components/dataset-style";
import AnalysisSettings from "./components/settings";

import { trackEvent } from "utils/analytics";

import "./styles.scss";

class MyDatasetForm extends PureComponent {
  state = {
    deleted: false,
  };

  render() {
    const {
      title,
      managerSection,
      setMyDataSettings,
      modalIntent,
      activeMyDataset,
      myDatasetId,
      canDelete,
    } = this.props;

    const sections = [
      {
        label: "Dataset",
        active: managerSection === "dataset",
        onClick: () => {
          setMyDataSettings({ managerSection: "dataset" });
        },
        Component: CreateEdit,
      },
      {
        label: "Upload",
        active: managerSection === "upload",
        onClick: () => {
          setMyDataSettings({ managerSection: "upload" });
          trackEvent({
            category: "My Data Upload",
            action: "Select upload section",
            label: "My Data",
          });
        },
        Component: Upload,
        disabled: !activeMyDataset || modalIntent === "create",
      },
      {
        label: "Published",
        active: managerSection === "files",
        onClick: () => {
          setMyDataSettings({ managerSection: "files" });
          trackEvent({
            category: "My Data Upload",
            action: "Select files section",
            label: "My Data",
          });
        },
        Component: PublishedList,
        disabled: !activeMyDataset || modalIntent === "create",
      },
      {
        label: "Style",
        active: managerSection === "style",
        onClick: () => {
          setMyDataSettings({ managerSection: "style" });
        },
        Component: DatasetStyle,
        disabled: !activeMyDataset || modalIntent === "create",
      },
      // {
      //   label: "Analysis Settings",
      //   active: managerSection === "analysis",
      //   onClick: () => {
      //     setMyDataSettings({ managerSection: "analysis" });
      //   },
      //   Component: AnalysisSettings,
      //   disabled: !activeMyDataset || modalIntent === "create",
      // },
    ];

    const activeSection = sections.find((s) => s.Component && s.active);

    const ActiveSectionComponent = activeSection && activeSection.Component;

    return (
      <div className="c-mydata-manager">
        <h1>{title}</h1>
        <div className="manager-wrapper">
          <SubnavMenu
            links={sections}
            className="manager-menu"
            theme="theme-subnav-small-light"
          />
          <div className="manager-body">
            <div className="row">
              <div className="column small-12">
                <div className="manager-section">
                  {activeSection ? (
                    <ActiveSectionComponent
                      canDelete={canDelete}
                      activeMyDataset={activeMyDataset}
                      myDatasetId={myDatasetId}
                    />
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

export default MyDatasetForm;
