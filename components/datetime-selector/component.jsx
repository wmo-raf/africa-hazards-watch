import React, { Component } from "react";
import dateFormater from "dateformat";
import PropTypes from "prop-types";
import Icon from "components/ui/icon";

import { defined } from "utils/core";
import DateTimePicker from "./components/datepicker";
import prevIcon from "assets/icons/prev.svg?sprite";
import nextIcon from "assets/icons/next.svg?sprite";
import recentIcon from "assets/icons/recent.svg?sprite";

import "./styles.scss";

class DateTimeSelectorSection extends Component {
  state = {
    isOpen: false,
    selectedTime: null,
  };

  componentDidMount() {
    this.setState({ selectedTime: this.props.selectedTime });
  }

  changeDateTime = (time) => {
    this.props.onChange(time.toISOString());
    this.setState({ selectedTime: time.toISOString() });
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

  onRecentButtonClicked = () => {
    const { availableDates } = this.props;

    const lastDateIndex = availableDates.length - 1;

    if (defined(lastDateIndex) && defined(availableDates[lastDateIndex])) {
      this.changeDateTime(new Date(availableDates[lastDateIndex]));
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
        discreteTime = dateFormater(time, dateFormat.currentTime);
      } else {
        discreteTime = formatDateTime(time);
      }
    }

    if (!defined(availableDates) || availableDates.length === 0) {
      return null;
    }

    const dates = availableDates.map((d) => new Date(d));

    return (
      <div className="datetime-selector">
        <div className="datetimeSelectorInner">
          <div className="datetimeAndPicker">
            <div className="controlsContainer">
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
            <button
              className="datetimeRecent"
              disabled={this.isNextTimeAvaliable()}
              onClick={this.onRecentButtonClicked}
              title="Latest Time"
            >
              <Icon icon={recentIcon} />
            </button>
          </div>
          <div title="Select a Time">
            <DateTimePicker
              currentDate={new Date(this.state.selectedTime)}
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
