import React, { Component } from "react";

import Button from "components/ui/button";
import Icon from "components/ui/icon";

import plusIcon from "assets/icons/plus.svg?sprite";
import LayerToggle from "components/map/components/legend/components/layer-toggle";

import "./styles.scss";

class MyData extends Component {
  renderNoDatasets() {
    const { isDesktop, setMyDataModalSettings } = this.props;
    return (
      <div className="mydata-header">
        {isDesktop && (
          <h2 className="title-no-data">
            You have not added any Datasets yet.
          </h2>
        )}
        <p>Configure and add your own Dataset to visualize on map</p>
        <Button
          theme="theme-button-medium"
          className="add-btn"
          onClick={() => setMyDataModalSettings(true)}
        >
          <div>Add</div>
          <Icon icon={plusIcon} className="add-icon" />
        </Button>
      </div>
    );
  }

  renderDatasets() {
    const { myDatasets, onToggleLayer } = this.props;

    return (
      <div className="mydata-list">
        {myDatasets.map((d) => {
          return (
            <LayerToggle
              key={d.id}
              className="dataset-toggle"
              data={{ ...d, dataset: d.id }}
              onToggle={onToggleLayer}
              showSubtitle
            />
          );
        })}
      </div>
    );
  }

  render() {
    const { myDatasets } = this.props;

    return (
      <div className="my-data">
        <div className="my-data-list">
          {myDatasets && myDatasets.length > 0
            ? this.renderDatasets()
            : this.renderNoDatasets()}
        </div>
      </div>
    );
  }
}

export default MyData;
