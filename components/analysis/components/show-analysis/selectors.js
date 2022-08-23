import { createSelector, createStructuredSelector } from "reselect";
import sumBy from "lodash/sumBy";

import { locationLevelToStr } from "utils/location";

import { getActiveLayers, getMapZoom } from "components/map/selectors";
import { getWidgetLayers, getLoading } from "components/analysis/selectors";
import {
  getGeodescriberTitle,
  getGeodescriberDescription,
} from "providers/geodescriber-provider/selectors";

const selectLocation = (state) => state.location && state.location.payload;
const selectData = (state) => state.analysis && state.analysis.data;
const selectError = (state) => state.analysis && state.analysis.error;

export const getDataFromLayers = createSelector(
  [getActiveLayers, selectData, selectLocation, getWidgetLayers],
  (layers, data, location, widgetLayers) => {
    if (!layers || !layers.length) return null;

    const { type } = location;
    const routeType = type === "country" ? "admin" : type;
    const admLevel = locationLevelToStr(location);

    return layers
      .filter(
        (l) =>
          !l.isBoundary &&
          !l.isRecentImagery &&
          l.analysisConfig &&
          l.analysisConfig.find((a) => a.type === routeType) &&
          (!widgetLayers || !widgetLayers.includes(l.id)) &&
          (!l.admLevels || l.admLevels.includes(admLevel))
      )
      .map((l) => {
        let analysisConfig = l.analysisConfig.find((a) => a.type === routeType);
        if (!analysisConfig) {
          analysisConfig = l.analysisConfig.find((a) => a.type === "geostore");
        }
        const { subKey, key, keys, service, unit, dateFormat, sumByKey } =
          analysisConfig || {};
        const dataByService = data[service] || {};
        const selectedValue = subKey
          ? dataByService[key] && dataByService[key][subKey]
          : dataByService[key];
        const value =
          sumByKey && Array.isArray(selectedValue)
            ? sumBy(selectedValue, sumByKey)
            : selectedValue;
        const { params, decodeParams } = l;
        const keysValue =
          keys &&
          keys.map((k, i) => ({
            label: k.title,
            value:
              (value && value[i] && value[i][k.key]) ||
              dataByService[k.key] ||
              0,
            unit: k.unit || unit,
            color: k.color,
          }));

        return {
          label: l.name,
          value: keysValue || value || 0,
          downloadUrls: dataByService && dataByService.downloadUrls,
          unit,
          dateFormat,
          color: l.color,
          ...params,
          ...decodeParams,
        };
      });
  }
);

export const getCountryDownloadLink = createSelector(
  [selectLocation],
  (location) => null
);

export const getDownloadLinks = createSelector(
  [getDataFromLayers, getCountryDownloadLink],
  (data, countryUrl) => {
    return [];
  }
);

export const getShowAnalysisProps = createStructuredSelector({
  // data: getDataFromLayers,
  loading: getLoading,
  layers: getActiveLayers,
  error: selectError,
  widgetLayers: getWidgetLayers,
  zoomLevel: getMapZoom,
  analysisTitle: getGeodescriberTitle,
  analysisDescription: getGeodescriberDescription,
  location: selectLocation,
});
