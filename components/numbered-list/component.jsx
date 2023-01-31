import React, { PureComponent } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import cx from "classnames";

import { formatNumber } from "utils/format";

import Paginate from "components/paginate";

import styles from "./numbered-list.module.scss";

const isServer = typeof window === "undefined";

class NumberedList extends PureComponent {
  render() {
    const {
      className,
      data,
      settings,
      settingsConfig,
      handlePageChange,
      linksDisabled,
      linksExt,
    } = this.props;
    const { page, pageSize, unit } = settings;
    const pageData = pageSize
      ? data.slice(page * pageSize, (page + 1) * pageSize)
      : data;

    const unitsConfig =
      settingsConfig && settingsConfig.find((conf) => conf.key === "unit");
    const selectedUnitConfig =
      unitsConfig &&
      unitsConfig.options &&
      !!unitsConfig.options.length &&
      unitsConfig.options.find((opt) => opt.value === unit);
    let formatUnit = unit;
    if (selectedUnitConfig) {
      formatUnit =
        selectedUnitConfig.unit !== undefined
          ? selectedUnitConfig.unit
          : selectedUnitConfig.value;
    }

    return (
      <div className={`${styles["c-numbered-list"]} ${className}`}>
        <ul className={styles.list}>
          {data.length > 0 &&
            pageData.map((item, index) => {
              const showBar = item.unit === "%" || unit === "%";
              const linkContent = (
                <div
                  className={cx(styles["list-item"], {
                    [styles["-bar"]]: showBar,
                  })}
                >
                  <div className={styles["item-label"]}>
                    <div
                      className={styles["item-bubble"]}
                      style={{ backgroundColor: item.color }}
                    >
                      {item.rank || index + 1 + pageSize * page}
                    </div>
                    <div className={styles["item-name"]}>{item.label}</div>
                  </div>
                  {showBar ? (
                    <div className={styles["item-bar-container"]}>
                      <div className={styles["item-bar"]}>
                        <div
                          className={`${styles["item-bar"]} ${styles["-data"]}`}
                          style={{
                            width: `${item.value > 100 ? 100 : item.value}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <div className={styles["item-value"]}>
                        {formatNumber({
                          num: item.value,
                          unit: item.unit || formatUnit,
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className={styles["item-value"]}>
                      {formatNumber({
                        num: item.value,
                        unit: item.unit || formatUnit,
                      })}
                    </div>
                  )}
                </div>
              );
              return (
                <li key={`${item.label}-${item.id}`}>
                  {item.path && linksExt && (
                    <a
                      href={`https://${!isServer && window.location.host}${
                        item.path
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkContent}
                    </a>
                  )}
                  {item.path && !linksExt && (
                    <Link {...item?.path}>
                      <a
                        className={`${linksDisabled ? styles["disabled"] : ""}`}
                      >
                        {linkContent}
                      </a>
                    </Link>
                  )}
                  {!item.path && (
                    <div
                      className={`${linksDisabled ? styles["disabled"] : ""}`}
                    >
                      {linkContent}
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
        {handlePageChange && data.length > settings.pageSize && (
          <Paginate
            settings={settings}
            count={data.length}
            onClickChange={handlePageChange}
          />
        )}
      </div>
    );
  }
}

NumberedList.propTypes = {
  data: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  settingsConfig: PropTypes.array,
  handlePageChange: PropTypes.func,
  className: PropTypes.string,
  linksDisabled: PropTypes.bool,
  linksExt: PropTypes.bool,
};

export default NumberedList;
