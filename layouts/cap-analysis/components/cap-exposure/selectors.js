import { createStructuredSelector, createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
import uniqBy from "lodash/uniqBy";

import {
  getFeatures,
  getAletAreasBbox,
  getFeatureCollection,
  getAlertSeverityColor,
} from "../../selectors";

const selectLoading = (state) => state.cap && state.cap.loading;
const selectGeostoreLoading = (state) =>
  state.cap && state.cap.geostore.loading;
const selectAnalysisLoading = (state) =>
  state.cap && state.cap.analysis.loading;
const selectGeostoreData = (state) => state.cap && state.cap.geostore.data;
const selectAnalysisData = (state) => state.cap && state.cap.analysis.data;

export const getFeatureIds = createSelector([getFeatures], (features) => {
  if (isEmpty(features)) return null;

  const featureIds = [];

  features.forEach((feature) => {
    if (feature.id) {
      featureIds.push(feature.id);
    }
  });

  return featureIds;
});

export const getFeatureLayers = createSelector([getFeatures], (features) => {
  if (isEmpty(features)) return null;

  const featureLayers = {};

  features.forEach((feature) => {
    if (feature.id) {
      const layer = { id: `area-${feature.id}`, data: feature };
      featureLayers[feature.id] = layer;
    }
  });

  return featureLayers;
});

export const getPopulationLayers = createSelector(
  [getFeatures, selectGeostoreData],
  (features, geostoreData) => {
    if (isEmpty(features) || isEmpty(geostoreData)) return null;

    const populationLayers = {};

    features.forEach((feature) => {
      if (feature.id && geostoreData[feature.id]) {
        const geostoreId = geostoreData[feature.id].geostoreId;

        populationLayers[feature.id] = geostoreId;
      }
    });

    return populationLayers;
  }
);

export const getAnalysisLayers = createSelector(
  [getFeatureIds, selectAnalysisData],
  (featureIds, analysisData) => {
    if (isEmpty(featureIds) || isEmpty(analysisData)) return null;

    const analysisFeatureCollections = {};

    featureIds.forEach((featId) => {
      if (analysisData[featId]) {
        Object.keys(analysisData[featId]).map((analysisType) => {
          const { data } = analysisData[featId][analysisType];

          if (!!data.length) {
            const features = data.reduce((all, feat) => {
              const { geom, ...rest } = feat;
              const feature = {
                type: "Feature",
                geometry: geom,
                properties: { capAreaId: featId, ...rest },
              };

              all.push(feature);

              return all;
            }, []);

            if (analysisFeatureCollections[analysisType]) {
              analysisFeatureCollections[analysisType].features.push(
                ...features
              );
            } else {
              analysisFeatureCollections[analysisType] = {
                type: "FeatureCollection",
                features: features,
              };
            }
          } else {
            if (!analysisFeatureCollections[analysisType]) {
              analysisFeatureCollections[analysisType] = {
                type: "FeatureCollection",
                features: [],
              };
            }
          }
        });
      }
    });

    const analysisLayers = Object.keys(analysisFeatureCollections).reduce(
      (all, layer) => {
        const layerData = analysisFeatureCollections[layer];

        // remove duplicates
        layerData.features = uniqBy(
          layerData.features,
          (item) => item.properties.gid
        );

        let layerIcon = "";

        switch (layer) {
          case "airports":
            layerIcon = "airport-1";
            break;
          case "power_plants":
            layerIcon = "electric-tower";
            break;
          case "dams":
            layerIcon = "dam";
            break;
          default:
            break;
        }

        const layerConfig = {
          id: layer,
          name: layer,
          type: "geojson",
          source: {
            data: layerData,
            type: "geojson",
          },
          render: {
            layers: [
              {
                type: "symbol",
                layout: {
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                  "icon-image": layerIcon,
                  "icon-size": 0.7,
                },
              },
            ],
          },
        };

        all.push(layerConfig);
        return all;
      },
      []
    );

    return analysisLayers;
  }
);

export const getAnalysisSummary = createSelector(
  [getAnalysisLayers],
  (analysisLayers) => {
    if (isEmpty(analysisLayers)) return null;

    const summary = analysisLayers.reduce((all, layer) => {
      const count = layer.source.data.features.length;

      all[layer.id] = count;

      return all;
    }, {});

    return summary;
  }
);

export const getAlertAreaLayer = createSelector(
  [getFeatureCollection, getAlertSeverityColor],
  (geojson, severityColor) => {
    if (isEmpty(geojson)) return null;

    const layerConfig = {
      id: "alert-area",
      name: "alert-area",
      type: "geojson",
      source: {
        data: geojson,
        type: "geojson",
      },
      render: {
        layers: [
          {
            type: "line",
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          },
        ],
      },
    };

    return layerConfig;
  }
);

export const getAlertAreas = createSelector(
  [getFeatures, getFeatureLayers, getPopulationLayers, getAnalysisLayers],
  (features, featureLayers, populationLayers, analysisLayers) => {
    if (
      isEmpty(features) ||
      isEmpty(featureLayers) ||
      isEmpty(populationLayers) ||
      isEmpty(analysisLayers)
    )
      return null;

    const details = [];

    features.forEach((feature) => {
      const featId = feature.id;
      details.push({
        featureId: featId,
        areaDesc: feature.properties.areaDesc,
        layers: {
          population: populationLayers[featId],
          alertArea: featureLayers[featId],
          ...analysisLayers,
        },
      });
    });

    return details;
  }
);

export const getCapExposureProps = createStructuredSelector({
  loading: selectLoading,
  analysisLayers: getAnalysisLayers,
  geostoreLoading: selectGeostoreLoading,
  analysisLoading: selectAnalysisLoading,
  areaLayer: getAlertAreaLayer,
  features: getFeatures,
  alertAreas: getAlertAreas,
  alertBbox: getAletAreasBbox,
  analysisSummary: getAnalysisSummary,
});
