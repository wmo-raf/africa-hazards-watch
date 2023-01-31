import React, { PureComponent } from "react";
import cx from "classnames";

import Icon from "components/ui/icon/component";

import styles from "./drawing-mode-selector.module.scss";

class DrawingModeSelector extends PureComponent {
  render() {
    const { options, activeMode, onChange } = this.props;

    if (options) {
      return (
        <div className={styles["c-drawing-modes"]}>
          {options.map((option) => (
            <div
              className={cx(styles["drawing-mode"], {
                active: option.value === activeMode,
              })}
              key={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.icon && (
                <Icon className={styles["draw-mode-icon"]} icon={option.icon} />
              )}
              <div className={styles["draw-mode-label"]}>{option.label}</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  }
}

export default DrawingModeSelector;
