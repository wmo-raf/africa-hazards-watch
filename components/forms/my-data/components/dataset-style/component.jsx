import React, { PureComponent } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

import Input from "components/forms/components/input";
import Error from "components/forms/components/error";
import Submit from "components/forms/components/submit";
import ConfirmationMessage from "components/confirmation-message";

import ColorPicker from "components/forms/components/color-picker";

import Button from "components/ui/button";
import Icon from "components/ui/icon";

import deleteIcon from "assets/icons/delete.svg?sprite";

import "./styles.scss";

const confirmations = {
  saved: {
    title: "Your style has been saved",
  },
  deleted: {
    title: "Style deleted successfully",
  },
};

export default class DatasetStyle extends PureComponent {
  state = {
    deleted: false,
  };

  handleSaveStyle(values) {
    const data = {
      min_data_value: Number(values.min_data_value),
      max_data_value: Number(values.max_data_value),
      colors:
        (values.colors &&
          values.colors.map((c) => ({
            rgba: c.color,
            threshold: Number(c.threshold),
          }))) ||
        [],
    };
  }

  render() {
    const {
      initialValues,
      deleteStyle,
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
          this.handleSaveStyle({
            ...initialValues,
            ...values,
            viewAfterSave,
          })
        }
        mutators={{
          ...arrayMutators,
        }}
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
            <form className="c-style-form" onSubmit={handleSubmit}>
              {(submitSucceeded || deleted) && (
                <ConfirmationMessage simple {...confirmationMeta} />
              )}

              <Input
                type="number"
                name="min_data_value"
                label="Minimum Data Value"
                required
              />

              <Input
                type="number"
                name="max_data_value"
                label="Maximum Data Value"
                required
              />

              <div className="color-values">
                <div className="c-array-title">Color Values</div>
                <div className="array-wrapper">
                  <FieldArray name="colors" required>
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div>
                            <div key={name} className="fields-container">
                              <Input
                                type="number"
                                name={`${name}.threshold`}
                                label="Threshold"
                                required
                              />
                              <ColorPicker
                                name={`${name}.color`}
                                label="Color"
                                required
                              />
                            </div>

                            <Button
                              className="remove-btn"
                              theme="theme-button-medium theme-button-light"
                              onClick={(e) => {
                                e.preventDefault();
                                fields.remove(index);
                              }}
                            >
                              <Icon icon={deleteIcon} className="delete-icon" />
                            </Button>
                          </div>
                        ))}

                        <Button
                          className="add-btn"
                          theme="theme-button-small"
                          onClick={(e) => {
                            e.preventDefault();
                            fields.push({
                              threshold: "",
                              color: "",
                            });
                          }}
                        >
                          Add new
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

              <Error
                valid={valid}
                submitFailed={submitFailed}
                submitError={submitError}
              />
              <div className="submit-actions">
                <Submit className="style-submit" submitting={submitting}>
                  save
                </Submit>
              </div>
            </form>
          );
        }}
      />
    );
  }
}
