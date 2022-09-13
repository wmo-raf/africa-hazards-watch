import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tippy";
import { isParent } from "utils/dom";
import { trackEvent } from "utils/analytics";
import cx from "classnames";

import Button from "components/ui/button";
import Icon from "components/ui/icon";

import settingsIcon from "assets/icons/settings.svg?sprite";
import AlertFilter from "../alert-filter";

import "./styles.scss";

class AlertFilterButton extends PureComponent {
  static propTypes = {
    filterConfig: PropTypes.array,
    loading: PropTypes.bool,
    active: PropTypes.bool,
  };

  state = {
    tooltipOpen: false,
  };

  toggleWidgetSettings = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  };

  render() {
    const { filterConfig, handleChangeFilter, active } = this.props;
    const { tooltipOpen } = this.state;

    return (
      <Tooltip
        className={cx("c-widget-settings-button", {
          "widget-settings-btn-active": active,
        })}
        theme="widget-tooltip-theme light"
        position="bottom-right"
        offset={-95}
        trigger="click"
        interactive
        onRequestClose={() => {
          const isTargetOnTooltip = isParent(
            this.alertFilterRef,
            this.alertFilterRef.evt
          );

          this.alertFilterRef.clearEvt();

          if (!isTargetOnTooltip) {
            this.setState({ tooltipOpen: false });
          }
        }}
        onShow={() => {
          this.setState({ tooltipOpen: true });
          trackEvent({
            category: "Alert Filter",
            action: "User opens alerts menu",
            label: "alerts",
          });
        }}
        arrow
        useContext
        open={tooltipOpen}
        html={
          <AlertFilter
            ref={(node) => {
              this.alertFilterRef = node;
            }}
            filterConfig={filterConfig}
            handleChangeFilter={handleChangeFilter}
          />
        }
      >
        <Button
          theme="theme-button-small square"
          tooltip={{ text: "Filter the data" }}
        >
          <Icon icon={settingsIcon} className="settings-icon" />
        </Button>
      </Tooltip>
    );
  }
}

export default AlertFilterButton;
