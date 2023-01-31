import React from "react";
import { Field } from "react-final-form";

import ReactDatePicker from "react-datepicker";

import styles from "./datepicker.module.scss";

const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
  <div className={styles["c-datepicker"]}>
    <ReactDatePicker
      showTimeSelect
      dateFormat="dd MMM yyyy HH:mm"
      selected={value}
      onChange={(date) => onChange(date)}
      isClearable
      {...rest}
    />
  </div>
);

const DatePicker = (props) => (
  <Field component={DatePickerAdapter} {...props} />
);

export default DatePicker;
