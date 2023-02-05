import React, { PureComponent } from "react";
import { Form } from "react-final-form";

import Checkbox from "components/forms/components/checkbox";
import DatePicker from "components/forms/components/datepicker";
import Error from "components/forms/components/error";
import Submit from "components/forms/components/submit";

import Button from "components/ui/button";
import Icon from "components/ui/icon";

import deleteIcon from "assets/icons/delete.svg?sprite";
import confirmIcon from "assets/icons/check.svg?sprite";
import cancelIcon from "assets/icons/close.svg?sprite";

import "./styles.scss";

class UploadItem extends PureComponent {
  state = {
    confirmRemoveUpload: false,
    removeUpload: false,
  };

  handleConfirmRemove = (confirmed) => {
    const { upload, onRemoveUpload } = this.props;

    this.setState(
      {
        confirmRemoveUpload: confirmed,
      },
      () => {
        if (
          this.state.confirmRemoveUpload &&
          upload &&
          upload.id &&
          onRemoveUpload
        ) {
          onRemoveUpload(upload.id);
        } else {
          this.setState({ removeUpload: false });
        }
      }
    );
  };

  handleOnRemoveUpload = () => {
    this.setState({
      removeUpload: true,
    });
  };

  handlePublishGTiff = (values) => {
    const { upload, publishRaster, activeMyDataset } = this.props;

    const { timestamp } = values;

    const timestampIso = timestamp.toISOString();

    const timestampData = { band: 1, timestamp: timestampIso };

    const data = {
      upload_id: upload.id,
      timestamps: [timestampData],
      activeDataset: activeMyDataset.mapDataset,
    };

    return publishRaster(data);
  };

  rendeGTiffForm = () => {
    return (
      <Form
        onSubmit={(values) => this.handlePublishGTiff(values)}
        render={({
          handleSubmit,
          valid,
          submitting,
          submitFailed,
          submitError,
          submitSucceeded,
        }) => {
          return (
            <form className="c-publish-form" onSubmit={handleSubmit}>
              <div className="timestamp-picker-wrapper">
                <div className="field-title">Date and Time: </div>
                <div className="timestamp-picker">
                  <DatePicker
                    name="timestamp"
                    required
                    placeholderText="Select Date and Time"
                    isClearable={false}
                  />
                </div>
              </div>

              <Error
                valid={valid}
                submitFailed={submitFailed}
                submitError={submitError}
              />

              <div className="submit-actions">
                <Submit className="publish-btn" submitting={submitting}>
                  publish
                </Submit>
              </div>
            </form>
          );
        }}
      />
    );
  };

  handlePublishNetCDF = (values) => {
    const { upload, publishRaster, activeMyDataset } = this.props;

    const { timestamps } = upload.raster_info;

    const timestampsData = values.timestamps.reduce((all, val) => {
      const index = timestamps.findIndex((t) => t === val);

      if (index > -1) {
        all.push({ band: index + 1, timestamp: val });
      }

      return all;
    }, []);

    const data = {
      upload_id: upload.id,
      timestamps: timestampsData,
      activeDataset: activeMyDataset.mapDataset,
    };

    return publishRaster(data);
  };

  renderNCForm = () => {
    const { upload } = this.props;

    const { timestamps } = upload.raster_info;

    if (timestamps && !!timestamps.length) {
      return (
        <Form
          onSubmit={(values) => this.handlePublishNetCDF(values)}
          render={({
            handleSubmit,
            valid,
            submitting,
            submitFailed,
            submitError,
            submitSucceeded,
          }) => {
            return (
              <form className="c-publish-form" onSubmit={handleSubmit}>
                <Checkbox
                  name="timestamps"
                  options={timestamps.map((t) => ({ label: t, value: t }))}
                  required
                />

                <Error
                  valid={valid}
                  submitFailed={submitFailed}
                  submitError={submitError}
                />
                <div className="submit-actions">
                  <Submit className="publish-btn" submitting={submitting}>
                    publish
                  </Submit>
                </div>
              </form>
            );
          }}
        />
      );
    }

    return null;
  };

  render() {
    const { upload, loading } = this.props;
    const { removeUpload } = this.state;

    const { driver } = upload.raster_info;

    return (
      <div className="upload-item">
        <div className="upload-detail">
          <div className="upload-name">{upload.name}</div>
          {!removeUpload && (
            <Button
              theme="theme-button-light theme-button-small"
              className="delete-upload-btn"
              onClick={this.handleOnRemoveUpload}
            >
              <Icon className="delete-icon" icon={deleteIcon} />
            </Button>
          )}

          {removeUpload && (
            <div className="remove-confirm">
              <div>Are you sure ?</div>
              <div className="actions">
                <div className="action-item">
                  <Button
                    theme="theme-button-light theme-button-xsmall"
                    className="delete-upload-btn"
                    onClick={() => this.handleConfirmRemove(true)}
                  >
                    <Icon className="confirm-icon" icon={confirmIcon} />
                  </Button>
                </div>
                <div className="action-item">
                  <Button
                    theme="theme-button-light theme-button-xsmall"
                    className="delete-upload-btn"
                    onClick={() => this.handleConfirmRemove(false)}
                  >
                    <Icon className="delete-icon" icon={cancelIcon} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="upload-publish-form">
          {driver === "netCDF" ? this.renderNCForm() : this.rendeGTiffForm()}
        </div>
      </div>
    );
  }
}

export default UploadItem;
