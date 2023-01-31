/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import cx from "classnames";

import { composeValidators } from "components/forms/validations";

import FieldWrapper from "components/forms/components/field-wrapper";

import styles from "./input.module.scss";

class Input extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    hidden: PropTypes.bool,
    validate: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    collapse: PropTypes.bool,
    infoClick: PropTypes.func,
    className: PropTypes.string,
  };

  render() {
    const {
      name,
      label,
      validate,
      type,
      placeholder,
      hidden,
      required,
      infoClick,
      collapse,
      className,
    } = this.props;

    return (
      <Field
        name={name}
        validate={composeValidators(required, validate)}
        type={type}
      >
        {({ input, meta }) => (
          <FieldWrapper
            label={label}
            name={name}
            {...meta}
            hidden={hidden}
            required={required}
            infoClick={infoClick}
            collapse={collapse}
            value={input.value}
          >
            {type === "textarea" ? (
              <textarea
                className={`${styles["c-form-input"]} ${styles.textarea}`}
                {...input}
                type={type}
                placeholder={placeholder}
              />
            ) : (
              <input
                className={cx(styles["c-form-input"], className)}
                {...input}
                type={type}
                placeholder={placeholder}
              />
            )}
          </FieldWrapper>
        )}
      </Field>
    );
  }
}

export default Input;
