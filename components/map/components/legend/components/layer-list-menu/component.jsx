import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { LegendItemTypes } from "vizzuality-components/dist/legend";
import LayerToggle from "../layer-toggle";
import LayerMoreInfo from "../layer-more-info";

import styles from "./layer-list-menu.module.scss";

class LayerListMenu extends PureComponent {
  render() {
    const { className, layers, onToggle, onInfoClick } = this.props;

    return (
      <div className={`${styles["c-layer-list-menu"]} ${className || ""}`}>
        {layers.map((l, i) =>
          !l.default ? (
            <div className={styles["layer-toggle"]} key={l.id}>
              <LayerToggle
                tabIndex={i}
                data={{ ...l, layer: l.id }}
                onToggle={onToggle}
                onInfoClick={() => onInfoClick(l.metadata)}
                // small
              />
              {l.nestedLegend && l.active && (
                // l.active && (
                <div className={styles["nested-legend"]}>
                  <LegendItemTypes activeLayer={l} />
                </div>
              )}
              {l.legendDesc && (
                <p className={styles["layer-description"]}>{l.legendDesc}</p>
              )}
              {l.moreInfo && (
                <LayerMoreInfo
                  className={styles["more-info"]}
                  {...l.moreInfo}
                />
              )}
            </div>
          ) : null
        )}
      </div>
    );
  }
}

LayerListMenu.propTypes = {
  className: PropTypes.string,
  layers: PropTypes.array,
  onToggle: PropTypes.func,
  onInfoClick: PropTypes.func,
};

export default LayerListMenu;
