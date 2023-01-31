import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { trackEvent } from "utils/analytics";

import { Tooltip } from "react-tippy";
import Tip from "components/ui/tip";
import Button from "components/ui/button";

import Icon from "components/ui/icon";
import arrowDownIcon from "assets/icons/arrow-down.svg?sprite";
import helpIcon from "assets/icons/help.svg?sprite";

import styles from "./layer-select-menu.module.scss";

class LayerSelectMenu extends PureComponent {
  state = {
    menuActive: false,
  };

  handleClickLayer(layer) {
    const { onSelectLayer } = this.props;
    onSelectLayer(layer);
    this.setState({ menuActive: false });
  }

  render() {
    const { className, layers, onInfoClick } = this.props;
    const { menuActive } = this.state;
    const activeLayer = layers && layers.find((l) => l.active);
    const layerList = layers.filter((l) => l.isSelector || l.default);

    if (layerList.length <= 1) return null;
    return (
      <div
        className={`${styles["c-layer-select-menu"]} ${
          className || ""
        }`}
      >
        <div className={styles.selector}>
          <button onClick={() => this.setState({ menuActive: !menuActive })}>
            {activeLayer.name}
            <span className={styles.citation}>{activeLayer.citation}</span>
            <Icon
              icon={arrowDownIcon}
              className={`${styles["icon-arrow"]} ${
                menuActive ? styles.reverse : ""
              }`}
            />
          </button>
          {menuActive && (
            <ul className={styles.options}>
              {layers.map((l) =>
                l.isSelector || l.default ? (
                  <li
                    className={`${styles["layer-options"]} ${
                      l.id === activeLayer.id ? styles.active : ""
                    }`}
                    key={`${l.id}-${l.name}`}
                  >
                    <button onClick={() => this.handleClickLayer(l)}>
                      <p>
                        {l.name}
                        <Tooltip
                          theme="tip"
                          hideOnClick
                          position="top"
                          animation="none"
                          html={
                            <Tip
                              className={styles["dynamic-content"]}
                              html={l.description}
                            />
                          }
                          onShow={() =>
                            trackEvent({
                              category: "Open modal",
                              action: "Hover modal button",
                              label: `${l.layer}: ${
                                l?.applicationConfig?.metadata || l.description
                              }`,
                            })
                          }
                        >
                          <Button
                            className={`${styles["theme-button-tiny"]} ${styles["theme-button-grey-filled"]} ${styles.square} ${styles["info-button"]}`}
                            onClick={
                              l?.applicationConfig?.metadata &&
                              (() => onInfoClick(l.applicationConfig.metadata))
                            }
                          >
                            <Icon icon={helpIcon} />
                          </Button>
                        </Tooltip>
                      </p>
                      <span className={styles.citation}>{l.citation}</span>
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

LayerSelectMenu.propTypes = {
  className: PropTypes.string,
  layers: PropTypes.array,
  onSelectLayer: PropTypes.func,
  onInfoClick: PropTypes.func,
};

export default LayerSelectMenu;
