import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "components/ui/icon";

import { defined } from "utils/core";
import DateTimePicker from "./components/datepicker";
import prevIcon from "assets/icons/prev.svg?sprite";
import nextIcon from "assets/icons/next.svg?sprite";

import "./styles.scss";
import { dFormatter } from "~/utils/date-format";

class DateTimeSelectorSection extends Component {
  state = {
    isOpen: false,
  };

  changeDateTime = (time) => {
    this.props.onChange(time.toISOString());
  };

  onPreviousButtonClicked = () => {
    const { availableDates } = this.props;
    const currentTimeIndex = this.getCurrentTimeIndex();
    if (
      defined(currentTimeIndex) &&
      defined(availableDates[currentTimeIndex - 1])
    ) {
      this.changeDateTime(new Date(availableDates[currentTimeIndex - 1]));
    }
  };

  onNextButtonClicked = () => {
    const { availableDates } = this.props;
    const currentTimeIndex = this.getCurrentTimeIndex();
    if (
      defined(currentTimeIndex) &&
      defined(availableDates[currentTimeIndex + 1])
    ) {
      this.changeDateTime(new Date(availableDates[currentTimeIndex + 1]));
    }
  };

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  toggleOpen = (event) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    event.stopPropagation();
  };

  isPreviousTimeAvaliable = () => {
    const { availableDates } = this.props;
    const currentTimeIndex = this.getCurrentTimeIndex();

    if (
      defined(currentTimeIndex) &&
      defined(availableDates[currentTimeIndex - 1])
    ) {
      return false;
    }
    return true;
  };

  isNextTimeAvaliable = () => {
    const { availableDates } = this.props;
    const currentTimeIndex = this.getCurrentTimeIndex();

    if (
      defined(currentTimeIndex) &&
      defined(availableDates[currentTimeIndex + 1])
    ) {
      return false;
    }

    return true;
  };

  getCurrentTimeIndex = () => {
    const { availableDates, selectedTime } = this.props;

    return availableDates.findIndex((d) => d === selectedTime);
  };

  render() {
    let discreteTime;
    let format;

    const { selectedTime, availableDates, dateFormat } = this.props;

    if (defined(selectedTime)) {
      const time = selectedTime;
      if (defined(dateFormat.currentTime)) {
        format = dateFormat;
        discreteTime = dFormatter(
          time,
          dateFormat.currentTime,
          dateFormat.asPeriod
        );
      } else {
        discreteTime = formatDateTime(time);
      }
    }

    if (!defined(availableDates) || availableDates.length === 0) {
      return null;
    }

    const dates = availableDates.map((d) => new Date(d));

    return (
      <div className="datetimeSelector">
        <div className="datetimeSelectorInner">
          <div className="datetimeAndPicker">
            <button
              className="datetimePrevious"
              disabled={this.isPreviousTimeAvaliable()}
              onClick={this.onPreviousButtonClicked}
              title="Previous Time"
            >
              <Icon icon={prevIcon} />
            </button>
            <button
              className="currentDate"
              onClick={this.toggleOpen}
              title="Select a time"
            >
              {defined(discreteTime) ? discreteTime : "Time out of range"}
            </button>
            <button
              className="datetimeNext"
              disabled={this.isNextTimeAvaliable()}
              onClick={this.onNextButtonClicked}
              title="Next Time"
            >
              <Icon icon={nextIcon} />
            </button>
          </div>
          <div title="Select a Time">
            <DateTimePicker
              currentDate={new Date(selectedTime)}
              dates={dates}
              onChange={this.changeDateTime}
              openDirection="down"
              isOpen={this.state.isOpen}
              showCalendarButton={false}
              onOpen={this.onOpen}
              onClose={this.onClose}
              dateFormat={format}
            />
          </div>
        </div>
      </div>
    );
  }
}

DateTimeSelectorSection.propTypes = {
  availableDates: PropTypes.array,
  selectedTime: PropTypes.string,
};

export default DateTimeSelectorSection;
