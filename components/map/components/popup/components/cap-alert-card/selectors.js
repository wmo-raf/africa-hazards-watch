import { createSelector, createStructuredSelector } from "reselect";
import moment from "moment";

const getInteractionData = (state, { data }) => data;

const SEVERITY_MAPPING = {
  4: {
    color: "#d72f2a",
    name: "Extreme Severity",
  },
  3: {
    color: "#fe9900",
    name: "Severe Severity",
  },
  2: {
    color: "#ffff00",
    fontColor: "#000",
    name: "Moderate Severity",
  },
  1: {
    color: "#03ffff",
    fontColor: "#000",
    name: "Minor Severity",
  },
  uknown: {
    color: "#3366ff",
    name: "Unknown Severity",
  },
};

const URGENCY_MAPPING = {
  4: {
    name: "Immediate",
  },
  3: {
    name: "Expected",
  },
  2: {
    name: "Future",
  },
  1: {
    name: "Past",
  },
  uknown: {
    name: "Unknown",
  },
};

const CERTAINTY_MAPPING = {
  4: {
    name: "Observed",
  },
  3: {
    name: "Likely",
  },
  2: {
    name: "Possible",
  },
  1: {
    name: "Unlikely",
  },
  uknown: {
    name: "Unknown",
  },
};

const MAPPING_FIELDS = {
  severity: SEVERITY_MAPPING,
  urgency: URGENCY_MAPPING,
  certainty: CERTAINTY_MAPPING,
};

export const getCardData = createSelector(
  [getInteractionData],
  (interaction = {}) => {
    const { data, layer } = interaction;
    const { interactionConfig } = layer || {};

    const properties = interactionConfig && data.properties;

    const capData = {
      ...properties,
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

    const { detailLink } = capData || {};

    const buttons = detailLink
      ? [
          {
            text: "MORE DETAILS",
            extLink: detailLink,
            theme: `theme-button-small`,
          },
        ]
      : [];

    return {
      ...capData,
      ...tagConfig,
      buttons,
    };
  }
);

export const getCapAlertCardProps = createStructuredSelector({
  data: getCardData,
});
