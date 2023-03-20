import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import cx from "classnames";

import NoContent from "components/ui/no-content";
import LayerToggle from "components/map/components/legend/components/layer-toggle";

// import Dropdown from "components/ui/dropdown";
import Basemaps from "components/basemaps";

import DatasetSection from "./dataset-section";
import CategoriesMenu from "./categories-menu";

import "./styles.scss";

class Datasets extends PureComponent {
  render() {
    const {
      isDesktop,
      datasetCategory,
      datasetCategories,
      menuSection,
      countries,
      selectedCountries,
      countriesWithoutData,
      datasets,
      subCategories,
      onToggleLayer,
      setModalMetaSettings,
      setMenuSettings,
      handleRemoveCountry,
      handleAddCountry,
      onToggleSubCategoryCollapse,
      onToggleForecastModel,
      id: sectionId,
      selectedForecastModel,
    } = this.props;

    return (
      <div className="c-datasets">
        {!isDesktop &&
          menuSection &&
          !datasetCategory &&
          datasetCategories &&
          datasetCategories.length && (
            <div>
              <Basemaps />
              <CategoriesMenu
                categories={datasetCategories}
                onSelectCategory={setMenuSettings}
              />
            </div>
          )}
        {menuSection && datasetCategory && (
          <Fragment>
            {/* <div className="countries-selection">
              <span className="sub-title">country-specific data</span>
              <div className="pills">
                {selectedCountries &&
                  selectedCountries.map((c) => (
                    <Pill
                      key={c.value}
                      active={!countriesWithoutData.includes(c.label)}
                      label={c.label}
                      onRemove={() => handleRemoveCountry(c.value)}
                    >
                      {c.label}
                    </Pill>
                  ))}
                {countries && !!countries.length && (
                  <Dropdown
                    className="country-dropdown"
                    theme="theme-dropdown-button theme-dropdown-button-small"
                    placeholder="+ Add country"
                    noItemsFound="No country found"
                    noSelectedValue="+ Add country"
                    options={countries}
                    onChange={handleAddCountry}
                  />
                )}
              </div>
            </div> */}
            {countriesWithoutData &&
              !!countriesWithoutData.length &&
              selectedCountries &&
              !!selectedCountries.length && (
                <div className="no-datasets-legend">
                  <span className="legend-dot" />
                  <p className="no-datasets-message">
                    No datasets available in{" "}
                    {countriesWithoutData.map((c, i, a) => {
                      let separator = ", ";
                      if (i === a.length - 2) separator = " or ";
                      if (i === a.length - 1) separator = " ";
                      return (
                        <Fragment key={c}>
                          <strong>{c}</strong>
                          {separator}
                        </Fragment>
                      );
                    })}
                    for {datasetCategory && datasetCategory.toLowerCase()}.
                  </p>
                </div>
              )}
            {subCategories
              ? subCategories.map((subCat) => (
                  <DatasetSection
                    key={subCat.slug}
                    sectionId={sectionId}
                    {...subCat}
                    onToggleCollapse={onToggleSubCategoryCollapse}
                  >
                    {subCat.model_options && (
                      <div className="model-options-wrapper">
                        {subCat.model_options_title && (
                          <div className="model-options-title">
                            {subCat.model_options_title}
                          </div>
                        )}
                        <div className="model-options">
                          {subCat.model_options.map((modelOption) => (
                            <div
                              key={modelOption.value}
                              className={cx("model-option", {
                                active:
                                  modelOption.value === selectedForecastModel,
                              })}
                              onClick={() => {
                                onToggleForecastModel(modelOption.value);
                              }}
                            >
                              {modelOption.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {!isEmpty(subCat.datasets) ? (
                      subCat.datasets.map((d) => {
                        if (subCat.model_options && selectedForecastModel) {
                          if (d.model && selectedForecastModel === d.model) {
                            return (
                              <LayerToggle
                                key={d.id}
                                className="dataset-toggle"
                                data={{ ...d, dataset: d.id }}
                                onToggle={onToggleLayer}
                                onInfoClick={setModalMetaSettings}
                                showSubtitle
                                category={datasetCategory}
                              />
                            );
                          } else {
                            return null;
                          }
                        }

                        return (
                          <LayerToggle
                            key={d.id}
                            className="dataset-toggle"
                            data={{ ...d, dataset: d.id }}
                            onToggle={onToggleLayer}
                            onInfoClick={setModalMetaSettings}
                            showSubtitle
                            category={datasetCategory}
                          />
                        );
                      })
                    ) : (
                      <NoContent
                        className="no-datasets"
                        message="No datasets available"
                      />
                    )}
                  </DatasetSection>
                ))
              : datasets &&
                datasets.map((d, i) => (
                  <LayerToggle
                    key={d.id}
                    tabIndex={i}
                    className="dataset-toggle"
                    data={{ ...d, dataset: d.id }}
                    onToggle={onToggleLayer}
                    onInfoClick={setModalMetaSettings}
                    category={datasetCategory}
                  />
                ))}
          </Fragment>
        )}
      </div>
    );
  }
}

Datasets.propTypes = {
  name: PropTypes.string,
  datasets: PropTypes.array,
  onToggleLayer: PropTypes.func,
  setModalMetaSettings: PropTypes.func,
  subCategories: PropTypes.array,
  selectedCountries: PropTypes.array,
  countries: PropTypes.array,
  setMenuSettings: PropTypes.func,
  countriesWithoutData: PropTypes.array,
  setMapSettings: PropTypes.func,
  activeDatasets: PropTypes.array,
  categories: PropTypes.array,
  category: PropTypes.string,
  section: PropTypes.string,
  isDesktop: PropTypes.bool,
  handleRemoveCountry: PropTypes.func,
  handleAddCountry: PropTypes.func,
  datasetCategory: PropTypes.string,
  datasetCategories: PropTypes.array,
  menuSection: PropTypes.string,
};

export default Datasets;
