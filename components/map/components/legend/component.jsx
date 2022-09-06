import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import isEmpty from "lodash/isEmpty";

import {
  Legend,
  LegendListItem,
  LegendItemTypes,
  LegendItemToolbar,
  LegendItemButtonOpacity,
  LegendItemButtonInfo,
  LegendItemButtonRemove,
  Icons,
} from "vizzuality-components";

import Loader from "components/ui/loader";
import NoContent from "components/ui/no-content";
import SentenceSelector from "components/sentence-selector";
import DateTimeSelector from "components/datetime-selector";
import WidgetCaution from "components/widget/components/widget-caution";
import Icon from "components/ui/icon";

import Timeline from "./components/timeline";
import LayerListMenu from "./components/layer-list-menu";
import LayerSelectMenu from "./components/layer-select-menu";
import LayerSelectorMenu from "./components/layer-selector-menu";
import LayerStatement from "./components/layer-statement";
import LayerAnalysisStatement from "./components/layer-analysis-statement";
import LayerMoreInfo from "./components/layer-more-info";

import updateIcon from "assets/icons/refresh.svg?sprite";

import "./styles.scss";
import "./themes/vizzuality-legend.scss";

const MapLegend = ({
  layerGroups,
  onChangeOrder,
  onChangeTimeline,
  onChangeThreshold,
  onToggleLayer,
  onSelectLayer,
  onChangeLayer,
  onChangeParam,
  onChangeDecodeParam,
  onChangeInfo,
  loading,
  className,
  layerTimestamps,
  activeLayers,
  ...rest
}) => {
  const noLayers = !layerGroups || !layerGroups.length;

  return (
    <div className={cx("c-legend", { "-empty": noLayers }, className)}>
      <Icons />
      {loading && <Loader className="datasets-loader" />}
      {!loading && noLayers && <NoContent message="No layers selected" />}
      {!loading && layerGroups && !!layerGroups.length && (
        <Legend
          layerGroups={layerGroups}
          collapsable={false}
          onChangeOrder={onChangeOrder}
        >
          {layerGroups.map((lg, i) => {
            const {
              isSelectorLayer,
              isMultiLayer,
              isMultiSelectorLayer,
              selectorLayerConfig,
              color,
              metadata,
              id,
              layers,
              statementConfig,
              caution,
              caution_gladL,
              caution_radd,
              name,
            } = lg || {};

            const activeLayer = layers && layers.find((l) => l.active);

            const getWarningLabel = () => {
              switch (activeLayer.id) {
                case "integrated-deforestation-alerts-8bit":
                  return `${caution_gladL}<br /><br />${caution_radd}`;
                case "integrated-deforestation-alerts-8bit-gladL":
                  return caution_gladL;
                case "integrated-deforestation-alerts-8bit-radd":
                  return caution_radd;
                default:
                  return null;
              }
            };
            const warningLabel = getWarningLabel();

            const {
              params,
              paramsSelectorConfig,
              paramsSelectorColumnView,
              decodeParams,
              decodeParamsSelectorConfig,
              moreInfo,
              timelineParams,
              statement,
              citation,
              disclaimer,
              filterParams,
              paramsFilterConfig,
              legendImage,
            } = activeLayer || {};

            const isUpdating = activeLayers.find(
              (l) => l.id === activeLayer.id && l.isUpdating
            );

            return (
              <LegendListItem
                index={i}
                key={id}
                layerGroup={lg}
                toolbar={
                  <LegendItemToolbar
                    {...rest}
                    enabledStyle={{
                      fill: color || "#97be32",
                    }}
                    defaultStyle={{
                      fill: "#999",
                    }}
                    disabledStyle={{
                      fill: "#d6d6d9",
                    }}
                    focusStyle={{
                      fill: "#676867",
                    }}
                    onChangeInfo={() => onChangeInfo(metadata)}
                  >
                    <LegendItemButtonOpacity
                      className="-plain"
                      handleStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                        border: 0,
                        boxShadow: "rgba(0, 0, 0, 0.29) 0px 1px 2px 0px",
                      }}
                      trackStyle={[
                        { backgroundColor: color || "#97be32" },
                        { backgroundColor: "#d6d6d9" },
                      ]}
                    />
                    {metadata && <LegendItemButtonInfo />}
                    <LegendItemButtonRemove />
                  </LegendItemToolbar>
                }
              >
                {citation && <div>{citation}</div>}
                {disclaimer && <div className="disclaimer">{disclaimer}</div>}
                {isUpdating && (
                  <div className="updating-indicator">
                    <Icon icon={updateIcon} />
                    <div>Updating ...</div>
                  </div>
                )}
                {legendImage && legendImage.url && (
                  <div className="legend-image">
                    <img src={legendImage.url} />
                  </div>
                )}

                {!legendImage && <LegendItemTypes />}
                {statement && (
                  <LayerAnalysisStatement statementHtml={statement} />
                )}
                {statementConfig && (
                  <LayerStatement
                    className="layer-statement"
                    {...statementConfig}
                  />
                )}

                {isMultiLayer && (
                  <LayerSelectMenu
                    className="sub-layer-menu"
                    layers={lg.layers}
                    onSelectLayer={onSelectLayer}
                    onInfoClick={onChangeInfo}
                  />
                )}

                <div
                  className={cx("param-selectors", {
                    "-column": paramsSelectorColumnView,
                  })}
                >
                  {activeLayer &&
                    paramsSelectorConfig &&
                    params &&
                    paramsSelectorConfig.map((paramConfig) =>
                      paramConfig.type === "datetime" && !isUpdating ? (
                        <DateTimeSelector
                          key={`${activeLayer.name}-${paramConfig.key}`}
                          name={name}
                          className="param-selector"
                          {...paramConfig}
                          availableDates={
                            layerTimestamps[activeLayer.id] &&
                            !isEmpty(layerTimestamps[activeLayer.id])
                              ? layerTimestamps[activeLayer.id]
                              : paramConfig.availableDates
                          }
                          selectedTime={
                            params[paramConfig.key] || paramConfig.default
                          }
                          onChange={(value) =>
                            onChangeParam(activeLayer, {
                              [paramConfig.key]: value,
                            })
                          }
                        />
                      ) : paramConfig.options ? (
                        <SentenceSelector
                          key={`${activeLayer.name}-${paramConfig.key}`}
                          name={name}
                          className="param-selector"
                          {...paramConfig}
                          value={params[paramConfig.key] || paramConfig.default}
                          columnView={paramsSelectorColumnView}
                          onChange={(e) =>
                            onChangeParam(activeLayer, {
                              [paramConfig.key]: e,
                            })
                          }
                        />
                      ) : null
                    )}
                </div>

                {activeLayer &&
                  decodeParamsSelectorConfig &&
                  decodeParams &&
                  decodeParamsSelectorConfig.map((paramConfig) =>
                    paramConfig.options ? (
                      <SentenceSelector
                        key={`${activeLayer.name}-${paramConfig.key}`}
                        name={name}
                        className="param-selector"
                        {...paramConfig}
                        value={
                          decodeParams[paramConfig.key] || paramConfig.default
                        }
                        onChange={(e) =>
                          onChangeDecodeParam(activeLayer, {
                            [paramConfig.key]: parseInt(e, 10),
                          })
                        }
                      />
                    ) : null
                  )}
                {(isSelectorLayer || isMultiSelectorLayer) &&
                  selectorLayerConfig && (
                    <LayerSelectorMenu
                      className="layer-selector"
                      layerGroup={lg}
                      name={name}
                      multi={isMultiSelectorLayer}
                      onChange={onChangeLayer}
                      {...selectorLayerConfig}
                    />
                  )}
                {timelineParams && (
                  <Timeline
                    {...timelineParams}
                    handleChange={onChangeTimeline}
                  />
                )}
                {isMultiLayer && (
                  <LayerListMenu
                    className="sub-layer-menu"
                    layers={lg.layers}
                    onToggle={onToggleLayer}
                    onInfoClick={onChangeInfo}
                  />
                )}
                {statementConfig && (
                  <LayerStatement
                    className="layer-statement"
                    {...statementConfig}
                  />
                )}
                {caution && (
                  <WidgetCaution
                    locationType="map"
                    caution={{
                      text: caution,
                      visible: [
                        "wdpa",
                        "country",
                        "aoi",
                        "geostore",
                        "dashboard",
                        "map",
                      ],
                    }}
                  />
                )}
                {warningLabel && (
                  <WidgetCaution
                    locationType="map"
                    caution={{
                      text: warningLabel,
                      visible: [
                        "wdpa",
                        "country",
                        "aoi",
                        "geostore",
                        "dashboard",
                        "map",
                      ],
                    }}
                  />
                )}
                {moreInfo && (
                  <LayerMoreInfo className="more-info" {...moreInfo} />
                )}
              </LegendListItem>
            );
          })}
        </Legend>
      )}
    </div>
  );
};

MapLegend.defaultProps = {
  maxHeight: 300,
  LegendItemToolbar: <LegendItemToolbar />,
  LegendItemTypes: <LegendItemTypes />,
};

MapLegend.propTypes = {
  maxHeight: PropTypes.number,
  LegendItemToolbar: PropTypes.node,
  LegendItemTypes: PropTypes.node,
  className: PropTypes.string,
  layerGroups: PropTypes.array,
  loading: PropTypes.bool,
  onChangeOrder: PropTypes.func,
  onChangeTimeline: PropTypes.func,
  onChangeThreshold: PropTypes.func,
  onToggleLayer: PropTypes.func,
  onSelectLayer: PropTypes.func,
  onChangeParam: PropTypes.func,
  onChangeDecodeParam: PropTypes.func,
  onChangeLayer: PropTypes.func,
  onChangeInfo: PropTypes.func,
  layers: PropTypes.array,
};

export default MapLegend;
