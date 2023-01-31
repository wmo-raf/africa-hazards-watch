import React, { Component } from "react";

import Button from "components/ui/button";
import Icon from "components/ui/icon";

import plusIcon from "assets/icons/plus.svg?sprite";
import editIcon from "assets/icons/edit.svg?sprite";
import LayerToggle from "components/map/components/legend/components/layer-toggle";

import styles from "./my-data.module.scss";

class MyData extends Component {
  renderNoDatasets() {
    const { isDesktop, setMyDataModalSettings } = this.props;
    return (
      <div className={styles["my-data-header"]}>
        {isDesktop && (
          <h2 className={styles["title-no-data"]}>
            You have not added any Datasets yet.
          </h2>
        )}
        <p>Configure and add your own Dataset to visualize on map</p>
        <Button
          theme="theme-button-medium"
          className={styles["add-btn"]}
          onClick={() =>
            setMyDataModalSettings({
              myDatasetId: true,
              myDataIntent: "create",
            })
          }
        >
          <div>Add</div>
          <Icon icon={plusIcon} className={styles["add-icon"]} />
        </Button>
      </div>
    );
  }

  renderDatasets() {
    const { myDatasets, onToggleLayer, setMyDataModalSettings } = this.props;

    return (
      <>
        <div className={styles["my-data-toolbar"]}>
          <div>
            <Button
              theme="theme-button-medium"
              className={styles["add-btn"]}
              onClick={() =>
                setMyDataModalSettings({
                  myDatasetId: true,
                  myDataIntent: "create",
                })
              }
            >
              <div>Create Dataset</div>
              <Icon icon={plusIcon} className={styles["add-icon"]} />
            </Button>
          </div>
        </div>
        <div className={styles["my-data-list"]}>
          {myDatasets.map((d) => {
            return (
              <div key={d.id} className={styles["dataset-toggle"]}>
                <LayerToggle
                  data={{ ...d, dataset: d.id }}
                  onToggle={onToggleLayer}
                  showSubtitle
                />
                <div className={styles["dataset-toolbar"]}>
                  <div className={styles["dataset-tool"]}>
                    <Button
                      theme="theme-button-tiny theme-button-light"
                      onClick={() =>
                        setMyDataModalSettings({
                          myDatasetId: d.id,
                          myDataIntent: "edit",
                        })
                      }
                    >
                      <div>Edit</div>
                      <Icon icon={editIcon} className={styles["tool-icon"]} />
                    </Button>
                  </div>
                  <div className={styles["dataset-tool"]}>
                    <Button
                      theme="theme-button-tiny theme-button-light"
                      onClick={() =>
                        setMyDataModalSettings({
                          myDatasetId: d.id,
                          myDataIntent: "upload",
                        })
                      }
                    >
                      <div>Add Files</div>
                      <Icon icon={plusIcon} className={styles["tool-icon"]} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  render() {
    const { myDatasets } = this.props;

    return (
      <div className={styles["my-data"]}>
        {myDatasets && myDatasets.length > 0
          ? this.renderDatasets()
          : this.renderNoDatasets()}
      </div>
    );
  }
}

export default MyData;
