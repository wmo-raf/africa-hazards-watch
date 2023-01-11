import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { languages } from "utils/lang";
import request from "utils/request";

import { Loader } from "@erick-otenyo/hw-components";

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
    description: "You can view all your datasets in my Data",
  },
  deleted: {
    title: "This datasets has been deleted from your my Data.",
    error: true,
  },
};

class MyDatasetForm extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    initialValues: PropTypes.object,
    saveMyDataset: PropTypes.func,
    setModalSources: PropTypes.func,
    canDelete: PropTypes.bool,
    clearAfterDelete: PropTypes.bool,
    deleteMyDataset: PropTypes.func,
    viewAfterSave: PropTypes.bool,
    closeForm: PropTypes.func,
  };

  state = {
    deleted: false,
  };

  handleSaveMyDataset(values) {
    const { saveMyDataset } = this.props;
    const out = { ...values };

    out.data_type = "raster";
    // saveMyDataset(out);
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
      <Fragment>
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
                {submitSucceeded || deleted ? (
                  <Fragment>
                    <ConfirmationMessage {...confirmationMeta} />
                    <Button
                      className="reset-form-btn"
                      onClick={(e) => {
                        // stops button click triggering another submission of the form
                        e.preventDefault();
                        e.stopPropagation();
                        closeForm();
                      }}
                    >
                      Back to my datasets
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1>{title}</h1>
                    <div className="d-header"></div>
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
                    />

                    <Error
                      valid={valid}
                      submitFailed={submitFailed}
                      submitError={submitError}
                    />
                    <div className="submit-actions">
                      <Submit className="area-submit" submitting={submitting}>
                        save
                      </Submit>
                      {canDelete && initialValues && initialValues.id && (
                        <Button
                          className="delete-area"
                          theme="theme-button-clear"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteMyDataset({
                              id: initialValues.id,
                              clearAfterDelete,
                              callBack: () => this.setState({ deleted: true }),
                            });
                          }}
                        >
                          <Icon icon={deleteIcon} className="delete-icon" />
                          Delete Dataset
                        </Button>
                      )}
                    </div>
                  </Fragment>
                )}
              </form>
            );
          }}
        />
      </Fragment>
    );
  }
}

export default MyDatasetForm;
