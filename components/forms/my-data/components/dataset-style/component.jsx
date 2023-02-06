import React, { PureComponent } from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

import Input from "components/forms/components/input";
import Error from "components/forms/components/error";
import Submit from "components/forms/components/submit";
import ConfirmationMessage from "components/confirmation-message";
import Select from "components/forms/components/select";
import Checkbox from "components/forms/components/checkbox";
import Button from "components/ui/button";
import Icon from "components/ui/icon";

import deleteIcon from "assets/icons/delete.svg?sprite";

import { legendTypes } from "./config";

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
    console.log(values);
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

              <Select
                name="legendType"
                label="Style Type"
                placeholder="Select style type"
                options={legendTypes}
                required
              />

              <Input
                type="number"
                name="min_value"
                label="Minimum Data Value"
                required
              />

              <Input
                type="number"
                name="max_value"
                label="Maximum Data Value"
                required
              />

              <div className="color-values">
                <div className="c-array-title">Color Values</div>
                <div className="array-wrapper">
                  <FieldArray name="color_values" required>
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <>
                            <div key={name} className="fields-container">
                              <Input
                                type="number"
                                name="threshold"
                                label="Threshold"
                                required
                              />
                              <Input
                                type="number"
                                name="r"
                                label="R"
                                required
                              />
                              <Input
                                type="number"
                                name="g"
                                label="G"
                                required
                              />
                              <Input
                                type="number"
                                name="b"
                                label="B"
                                required
                              />
                              <Input
                                type="number"
                                name="a"
                                label="A"
                                required
                              />
                            </div>

                            <Button
                              className="remove-btn"
                              theme="theme-button-medium theme-button-light"
                              onClick={() => fields.remove(index)}
                            >
                              <Icon icon={deleteIcon} className="delete-icon" />
                            </Button>
                          </>
                        ))}

                        <Button
                          className="add-btn"
                          theme="theme-button-small"
                          onClick={() =>
                            fields.push({
                              threshold: "",
                              r: "",
                              g: "",
                              b: "",
                              a: "",
                            })
                          }
                        >
                          Add new
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

              <Checkbox
                name="interpolate"
                options={[
                  {
                    label: "Interpolate",
                    value: true,
                  },
                ]}
              />

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
