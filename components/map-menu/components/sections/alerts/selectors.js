import { isEmpty } from "lodash";
import { createStructuredSelector, createSelector } from "reselect";
import moment from "moment";

import { selectActiveLang } from "utils/lang";

const selectLoading = (state) => state.mapMenu && state.mapMenu.loading;
const selectLayersGeojsonData = (state) =>
  state.datasetsUpdate && state.datasetsUpdate.geojsonData;

const selectMapSettings = (state) => state.map && state.map.settings;

import {
  SEVERITY_MAPPING,
  URGENCY_MAPPING,
  CERTAINTY_MAPPING,
} from "components/map/components/popup/components/cap-alert-card/selectors";

const MAPPING_FIELDS = {
  severity: SEVERITY_MAPPING,
  urgency: URGENCY_MAPPING,
  certainty: CERTAINTY_MAPPING,
};

export const getCapData = createSelector(
  [selectLayersGeojsonData],
  (layersData) => {
    if (isEmpty(layersData)) return null;
    // get cap_alerts layer data
    const data = layersData["cap_alerts"];

    const alerts = data && data.features;

    const copyAlerts = [...alerts];

    copyAlerts.sort(function (a, b) {
      return b.properties.severity - a.properties.severity;
    });

    const alertsData = copyAlerts.map((alert) => {
      const capData = {
        ...alert.properties,
      };

      Object.keys(capData).forEach((key) => {
        if (MAPPING_FIELDS[key] && MAPPING_FIELDS[key][capData[key]]) {
          capData[key] = MAPPING_FIELDS[key][capData[key]];
        }

        if (key === "event") {
          const eventData = capData[key].split("^");

          capData["event"] = eventData[0];

          capData["eventSentTime"] = eventData[2].length;

          capData["eventSent"] =
            !!eventData[2].length && capData["utc"]
              ? moment(eventData[2]).from(capData["utc"])
              : "";
        }
      });

      const category = capData.severity;

      const tagConfig = {
        tag: category.name,
        tagColor: category.color,
        tagFontColor: category.fontColor && category.fontColor,
      };

      return {
        ...capData,
        ...tagConfig,
        feature: { type: "Feature", geometry: alert.geometry },
      };
    });

    // return cap_alerts layer data
    return alertsData;
  }
);

export const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  lang: selectActiveLang,
  alertData: getCapData,
  alertData: getCapData,
  mapSettings: selectMapSettings,
});
