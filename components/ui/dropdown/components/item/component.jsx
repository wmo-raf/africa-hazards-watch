import React from "react";
import PropTypes from "prop-types";

import Icon from "components/ui/icon";
import Button from "components/ui/button";

import arrowDownIcon from "assets/icons/arrow-down.svg?sprite";
import infoIcon from "assets/icons/info.svg?sprite";
import helpIcon from "assets/icons/help.svg?sprite";

import styles from "./item.module.scss";

const Item = (props) => {
  const {
    index,
    item,
    showGroup,
    highlightedIndex,
    getItemProps,
    handleSelectGroup,
    optionsAction,
    optionsActionKey,
    activeValue,
    activeLabel,
  } = props;
  const {
    group,
    groupParent,
    label,
    component = null,
    metaKey,
    infoText,
  } = item;
  const isActive =
    (!showGroup && !group) || group === showGroup || groupParent === showGroup;
  const isGroupParentActive = groupParent && showGroup === groupParent;
  const isHighlighted =
    highlightedIndex === index ||
    activeLabel === label ||
    (groupParent && groupParent === showGroup) ||
    (groupParent && activeValue && groupParent === activeValue.group);

  return (
    <div
      className={`${styles["c-selector-item-wrapper"]}
        ${isActive ? styles["show"] : ""}
        ${!group ? styles["base"] : ""}
        ${isGroupParentActive ? styles["selected"] : ""}
        ${groupParent ? styles["group-parent"] : ""}
      `}
    >
      {isGroupParentActive && (
        <Icon
          icon={arrowDownIcon}
          className={`${styles["group-icon"]} ${styles.selected}`}
          onClick={() => handleSelectGroup(item)}
        />
      )}
      <div
        {...getItemProps({
          item,
          index,
          className: `${styles["c-selector-item"]} ${
            isHighlighted ? styles["highlight"] : ""
          }`,
        })}
        {...(!!groupParent && {
          onClick: () => handleSelectGroup(item),
        })}
      >
        {component && component}
        {!component && label}
      </div>
      {metaKey && (
        <Button
          className={`${styles.square} ${styles["info-button"]}`}
          theme="theme-button-small"
          onClick={metaKey && (() => optionsAction(item[optionsActionKey]))}
          tooltip={infoText && { text: infoText }}
        >
          <Icon icon={infoIcon} className={styles["info-icon"]} />
        </Button>
      )}
      {!metaKey && infoText && (
        <Button
          className={`${styles.square} ${styles["info-button"]}`}
          theme="theme-button-small"
          tooltip={{ text: infoText }}
        >
          <Icon icon={helpIcon} className={styles["info-icon"]} />
        </Button>
      )}
      {groupParent && showGroup !== groupParent && (
        <Icon
          icon={arrowDownIcon}
          className={`${styles["group-icon"]} ${
            showGroup === groupParent ? styles["selected"] : ""
          }`}
        />
      )}
    </div>
  );
};

Item.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  showGroup: PropTypes.string,
  highlightedIndex: PropTypes.number,
  getItemProps: PropTypes.func,
  handleSelectGroup: PropTypes.func,
  optionsAction: PropTypes.func,
  optionsActionKey: PropTypes.string,
  activeValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Item;
