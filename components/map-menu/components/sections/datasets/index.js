import { createElement, PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { trackEvent } from "utils/analytics";

import { setModalMetaSettings } from "components/modals/meta/actions";
import Component from "./component";

class DatasetsMenuContainer extends PureComponent {
  static propTypes = {
    activeDatasets: PropTypes.array,
    setMapSettings: PropTypes.func,
    selectedCountries: PropTypes.array,
    setMenuSettings: PropTypes.func,
  };

  handleRemoveCountry = (iso) => {
    const { selectedCountries, setMenuSettings, activeDatasets } = this.props;
    const newCountries = selectedCountries.filter((c) => c.value !== iso);
    setMenuSettings({
      selectedCountries: newCountries ? newCountries.map((nc) => nc.value) : [],
    });
    this.props.setMapSettings({
      datasets: activeDatasets.filter((d) => d.iso !== iso),
    });
  };

  handleAddCountry = (country) => {
    const { selectedCountries, setMenuSettings } = this.props;
    setMenuSettings({
      selectedCountries: [
        ...selectedCountries.map((c) => c.value),
        country.value,
      ],
    });
    trackEvent({
      category: "Map menu",
      action: "User adds a country",
      label: country.label,
    });
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleRemoveCountry: this.handleRemoveCountry,
      handleAddCountry: this.handleAddCountry,
    });
  }
}

export default connect(null, { setModalMetaSettings })(DatasetsMenuContainer);
