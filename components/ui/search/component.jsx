import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "components/ui/icon";
import Button from "components/ui/button";
import debounce from "lodash/debounce";
import cx from "classnames";

import searchIcon from "assets/icons/search.svg?sprite";
import closeIcon from "assets/icons/close.svg?sprite";

import styles from "./search.module.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.input,
    };
  }

  handleChange = (value) => {
    this.setState({ search: value });
    this.debouncedChange();
  };

  handleKeyUp = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    if (onSubmit && e.keyCode === 13) {
      onSubmit(e.target.value);
    }
  };

  debouncedChange = debounce(() => {
    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange(this.state.search);
    }
  }, 150);

  render() {
    const { search } = this.state;
    const { placeholder, onSubmit, disabled, className, theme } = this.props;
    return (
      <div className={cx(styles["c-search"], theme, className)}>
        <input
          type="text"
          className={`${styles.input} ${styles.text}`}
          placeholder={placeholder}
          onChange={(e) => this.handleChange(e.target.value)}
          value={search}
          onKeyUp={this.handleKeyUp}
          disabled={disabled}
        />
        <button onClick={() => onSubmit && onSubmit(this.state.search)}>
          <Icon icon={searchIcon} className={styles["icon-search"]} />
        </button>
        {search && (
          <Button
            className={styles["clear-btn"]}
            theme="theme-button-clear theme-button-small square"
            onClick={() => this.handleChange("")}
          >
            <Icon icon={closeIcon} className={styles["icon-close"]} />
          </Button>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  input: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.string,
};

Search.defaultProps = {
  input: "",
};

export default Search;
