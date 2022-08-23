import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import { LayerManager, Layer } from "layer-manager/dist/components";
import { PluginMapboxGl, fetch } from "layer-manager";

class LayerManagerComponent extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    layers: PropTypes.array,
    basemap: PropTypes.object,
    setMapLoading: PropTypes.func,
    map: PropTypes.object,
    allDatasets: PropTypes.array,
    activeDatasets: PropTypes.array,
  };

  handleOnAdd = (layerModel) => {
    const { layerConfig } = layerModel;

    const {
      allDatasets,
      activeDatasets,
      setMapSettings,
      setMainMapSettings,
    } = this.props;

    if (layerModel && layerModel.isMultiLayer && layerModel.default) {
      const { dataset } = layerModel;

      // NOTE: Add related layers. This are layers that should be switched on together as a group
      const relatedDataset = allDatasets.find((d) => d.id === dataset);

      if (
        relatedDataset &&
        relatedDataset.layers &&
        !!relatedDataset.layers.length
      ) {
        const { layers } = relatedDataset;

        const nonDefaultLayers = layers
          .filter((l) => !l.default)
          .map((l) => l.id);

        const newActiveDatasets = activeDatasets.map((newDataset, i) => {
          if (newDataset.dataset === dataset) {
            const newActiveDataset = activeDatasets[i];
            return {
              ...newActiveDataset,
              layers: [...newActiveDataset.layers, ...nonDefaultLayers],
            };
          }
          return newDataset;
        });

        setMapSettings({ datasets: newActiveDatasets, canBound: true });
      }
    }
  };

  handleOnRemove = (layerModel) => {};

  render() {
    const { layers, basemap, map } = this.props;

    const basemapLayer =
      basemap && basemap.url
        ? {
            id: basemap.url,
            name: "Basemap",
            layerConfig: {
              type: "raster",
              source: {
                type: "raster",
                tiles: [basemap.url],
              },
            },
            zIndex: 100,
          }
        : null;

    const allLayers = [basemapLayer].concat(layers).filter((l) => l);
    return (
      <LayerManager
        map={map}
        plugin={PluginMapboxGl}
        providers={{
          stories: (layerModel, layer, resolve, reject) => {
            const { source } = layerModel;
            const { provider } = source;

            fetch("get", provider.url, provider.options, layerModel)
              .then((response) =>
                resolve({
                  ...layer,
                  source: {
                    ...omit(layer.source, "provider"),
                    data: {
                      type: "FeatureCollection",
                      features: response.rows.map((r) => ({
                        type: "Feature",
                        properties: r,
                        geometry: {
                          type: "Point",
                          coordinates: [r.lon, r.lat],
                        },
                      })),
                    },
                  },
                })
              )
              .catch((e) => {
                reject(e);
              });
          },
        }}
      >
        {allLayers &&
          allLayers.map((l) => {
            const config = l.config ? l.config : l.layerConfig;
            return (
              <Layer
                key={l.id}
                {...l}
                {...config}
                onAfterAdd={this.handleOnAdd}
                onAfterRemove={this.handleOnRemove}
              />
            );
          })}
      </LayerManager>
    );
  }
}

export default LayerManagerComponent;
