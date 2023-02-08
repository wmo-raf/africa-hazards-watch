import React, { PureComponent } from "react";

import { Form } from "react-final-form";

import Input from "components/forms/components/input";
import Error from "components/forms/components/error";
import Submit from "components/forms/components/submit";
import ConfirmationMessage from "components/confirmation-message";
import Button from "components/ui/button";
import Icon from "components/ui/icon";

import deleteIcon from "assets/icons/delete.svg?sprite";

import "./styles.scss";

const confirmations = {
  saved: {
    title: "Your dataset has been saved",
  },
  deleted: {
    title: "Dataset deleted successfully",
  },
};

export default class DatasetCreateEdit extends PureComponent {
  state = {
    deleted: false,
  };

  handleSaveMyDataset(values) {
    const { saveMyDataset } = this.props;
    const out = { ...values };

    return saveMyDataset(out);
  }

  render() {
    const {
      initialValues,
      deleteMyDataset,
      clearAfterDelete,
      canDelete,
      viewAfterSave,
      title,
      closeForm,
    } = this.props;

    const { deleted } = this.state;

    return (
      <Form
        onSubmit={(values) =>
          this.handleSaveMyDataset({
            ...initialValues,
            ...values,
            viewAfterSave,
          })
        }
        initialValues={initialValues}
        render={({
          handleSubmit,
          valid,
          submitting,
          submitFailed,
          submitError,
          submitSucceeded,
        }) => {
          let metaKey = "saved";
          if (deleted && initialValues && !initialValues.id) {
            metaKey = "deleted";
          }
          const confirmationMeta = confirmations[metaKey];

          return (
            <form className="c-mydataset-form" onSubmit={handleSubmit}>
              {(submitSucceeded || deleted) && (
                <ConfirmationMessage simple {...confirmationMeta} />
              )}

              <Input name="name" label="Title of Dataset" required />
              <Input
                type="text"
                name="description"
                label="Description of Dataset"
              />
              <Input
                type="text"
                name="data_variable"
                label="Data Variable"
                required
              />
              {/* <Input
                type="text"
                name="country"
                disabled
                label="Dataset Country"
                helpText="Data you upload will be cropped to your profile's country. You can update this from your profile."
                required
              /> */}

              <Error
                valid={valid}
                submitFailed={submitFailed}
                submitError={submitError}
              />
              <div className="submit-actions">
                <Submit className="dataset-submit" submitting={submitting}>
                  save
                </Submit>
                {canDelete && initialValues && initialValues.id && (
                  <Button
                    className="delete-dataset"
                    theme="theme-button-clear"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteMyDataset({
                        id: initialValues.id,
                        callBack: () => this.setState({ deleted: true }),
                      });
                    }}
                  >
                    <Icon icon={deleteIcon} className="delete-icon" />
                    Delete Dataset
                  </Button>
                )}
              </div>
            </form>
          );
        }}
      />
    );
  }
}
