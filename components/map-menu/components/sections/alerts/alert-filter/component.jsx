import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Dropdown from "components/ui/dropdown";
import Switch from "components/ui/switch";
import withTooltipEvt from "components/ui/with-tooltip-evt";

import styles from "./alert-filter.module.scss";

class AlertFilter extends PureComponent {
  static propTypes = {};

  renderOption = (option) => {
    const {
      type,
      label,
      options,
      key,
      value,
      handleChangeFilter,
      clearable,
      placeholder,
    } = option;

    const propagateChange = (change) => {
      handleChangeFilter(change);
    };

    switch (type) {
      case "switch":
        return (
          <Switch
            className={styles["widget-settings-selector"]}
            theme="theme-switch-light"
            label={label}
            value={value && value.value}
            options={options}
            onChange={(change) => propagateChange({ [key]: change })}
          />
        );
      default:
        return (
          options &&
          !!options.length && (
            <Dropdown
              className={cx(styles["widget-settings-selector"], styles[type])}
              theme={cx(styles["theme-select-light"], {
                [styles["theme-dropdown-button"]]: type === "mini-select",
              })}
              label={label}
              value={value}
              options={options}
              onChange={(change) =>
                propagateChange({ [key]: change && change.value })
              }
              clearable={clearable}
              noSelectedValue={placeholder}
            />
          )
        );
    }
  };

  render() {
    const {
      filterConfig,
      handleChangeFilter,
      getTooltipContentProps,
    } = this.props;

    return (
      <div
        className={styles["c-widget-settings"]}
        {...getTooltipContentProps()}
      >
        {filterConfig &&
          filterConfig.map(
            (option) =>
              option.options &&
              !!option.options.length && (
                <div
                  key={option.key}
                  className={cx(styles["settings-option"], {
                    [styles.border]: option.border,
                  })}
                >
                  {this.renderOption({
                    ...option,
                    handleChangeFilter,
                  })}
                </div>
              )
          )}
      </div>
    );
  }
}

export default withTooltipEvt(AlertFilter);
