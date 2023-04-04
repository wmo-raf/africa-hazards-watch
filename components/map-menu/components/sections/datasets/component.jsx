import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import cx from "classnames";

import NoContent from "components/ui/no-content";
import LayerToggle from "components/map/components/legend/components/layer-toggle";

import Pill from "components/ui/pill";
import Dropdown from "components/ui/dropdown";
import Basemaps from "components/basemaps";

import DatasetSection from "./dataset-section";
import CategoriesMenu from "./categories-menu";
import LoginForm from "components/forms/login";

import "./styles.scss";

class Datasets extends PureComponent {
  renderLoginWindow() {
    return (
      <div className="login-header">
        <h3 className="title-login">Please log in</h3>
        <p>Log in is required so you can view datasets in this section</p>
        <LoginForm className="myhw-login" simple narrow />
      </div>
    );
  }
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
      handleChangeCountry,
      onToggleSubCategoryCollapse,
      onToggleGroupOption,
      id: sectionId,
      subCategoryGroupsSelected,
      selectedCountry,
      loggedIn,
    } = this.props;

    const matching =
      countries &&
      selectedCountry &&
      countries.find((c) => c.value === selectedCountry);

    const activeDatasetCategory =
      datasetCategory &&
      datasetCategories.find((c) => c.category === datasetCategory);

    const { loginRequired } = activeDatasetCategory || {};

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

        {loginRequired && !loggedIn ? (
          this.renderLoginWindow()
        ) : (
          <>
            {" "}
            {menuSection && datasetCategory && (
              <Fragment>
                <div className="countries-selection">
                  <span className="sub-title">Select Country</span>
                  <div className="pills">
                    {matching && (
                      <Pill
                        key={matching.value}
                        active
                        removable
                        label={matching.label}
                        onRemove={() => handleChangeCountry("africa")}
                      >
                        {matching.label}
                      </Pill>
                    )}
                    {countries && !!countries.length && (
                      <Dropdown
                        className="country-dropdown"
                        theme="theme-dropdown-button theme-dropdown-button-small"
                        placeholder="+ Add country"
                        noItemsFound="No country found"
                        noSelectedValue="+ Select country"
                        options={countries}
                        onChange={handleChangeCountry}
                      />
                    )}
                  </div>
                </div>
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
                  ? subCategories.map((subCat) => {
                      const groupKey = `${sectionId}-${subCat.id}`;
                      let selectedGroup = subCategoryGroupsSelected[groupKey];
                      // set default group
                      if (
                        !selectedGroup &&
                        subCat.group_options &&
                        !!subCat.group_options.length
                      ) {
                        const defaultGroup =
                          subCat.group_options.find((o) => o.default) ||
                          subCat.group_options[0];

                        selectedGroup = defaultGroup.value;
                      }

                      return (
                        <DatasetSection
                          key={subCat.slug}
                          sectionId={sectionId}
                          {...subCat}
                          onToggleCollapse={onToggleSubCategoryCollapse}
                        >
                          {subCat.group_options && (
                            <div className="group-options-wrapper">
                              {subCat.group_options_title && (
                                <div className="group-options-title">
                                  {subCat.group_options_title}
                                </div>
                              )}
                              <div className="group-options">
                                {subCat.group_options.map((groupOption) => {
                                  return (
                                    <div
                                      key={groupOption.value}
                                      className={cx("group-option", {
                                        active:
                                          groupOption.value === selectedGroup,
                                      })}
                                      onClick={() => {
                                        onToggleGroupOption(
                                          groupKey,
                                          groupOption.value
                                        );
                                      }}
                                    >
                                      {groupOption.label}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {!isEmpty(subCat.datasets) ? (
                            subCat.datasets.map((d) => {
                              if (
                                d.group &&
                                subCat.group_options &&
                                !!subCat.group_options.length
                              ) {
                                if (d.group && d.group === selectedGroup) {
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
                      );
                    })
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
          </>
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
