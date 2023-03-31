import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import isEmpty from "lodash/isEmpty";

import Icon from "components/ui/icon";

import Button from "components/ui/button/component";

import "./styles.scss";

class NMHSLogo extends PureComponent {
  render() {
    const { menuSection, top, countryConfig } = this.props;

    if (isEmpty(countryConfig)) return null;

    return (
      <div
        className={cx(
          "c-map-nmhs-logo",
          { relocate: !!menuSection && menuSection.Component },
          { big: menuSection && menuSection.large },
          { top: top }
        )}
      >
        <div className="intro"> Country data contributed by:</div>
        <a className="nmhs-wrapper" href={countryConfig.link} target="_blank">
          {countryConfig.logo && (
            <img
              className="nmhs-logo"
              src={countryConfig.logo}
              alt={countryConfig.name}
            />
          )}
          <div>
            <div className="nmhs-name">{countryConfig.name}</div>
          </div>
        </a>
      </div>
    );
  }
}

NMHSLogo.propTypes = {
  top: PropTypes.bool,
};

export default NMHSLogo;
