import { createSelector, createStructuredSelector } from "reselect";

const getInteractionData = (state, { data }) => data;

const CATEGORIES = {
  extreme: {
    color: "#d72f2a",
    name: "Extreme Severity",
  },
  severe: {
    color: "#fe9900",
    name: "Severe Severity",
  },
  moderate: {
    color: "#ffff00",
    fontColor: "#000",
    name: "Moderate Severity",
  },
  minor: {
    color: "#03ffff",
    name: "Minor Severity",
  },
  uknown: {
    color: "#3366ff",
    name: "Unknown Severity",
  },
};

export const getCardData = createSelector(
  [getInteractionData],
  (interaction = {}) => {
    const { data, layer } = interaction;
    const { interactionConfig } = layer || {};

    const capData = interactionConfig && data.properties;

    const category = CATEGORIES[capData.severity];

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
