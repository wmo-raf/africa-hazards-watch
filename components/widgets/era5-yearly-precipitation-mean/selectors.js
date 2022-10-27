import { createSelector, createStructuredSelector } from "reselect";
import { formatNumber } from "utils/format";
import { gskyWpsPrecipitationDataByYear } from "utils/data";

const getData = (state) => state.data && state.data;
const getCurrentLocation = (state) => state.locationLabel;
const getColors = (state) => state.colors;
const getSentences = (state) => state.sentences;

export const parseData = createSelector(
  [getData, getColors],
  (data, colors) => {
    if (!data) return null;

    const dataByYear = gskyWpsPrecipitationDataByYear(data);

    return dataByYear;
  }
);

const parseConfig = createSelector([getColors], (colors) => ({
  simpleNeedsAxis: true,
  height: 250,
  xKey: "year",
  yKeys: {
    bars: {
      mean: {
        fill: colors.rainfall,
        yAxisId: "mean",
      },
    },
  },
  unit: " mm",
  yAxis: {
    yAxisId: "mean",
    domain: ["auto", "auto"],
  },
  tooltip: [
    {
      key: "year",
      label: "Year",
    },
    {
      key: "mean",
      label: "Rainfall",
      unitFormat: (value) => formatNumber({ num: value, unit: " mm" }),
    },
  ],
}));

const parseSentence = createSelector([parseData], (data, settings) => {
  return {};
});

export default createStructuredSelector({
  data: parseData,
  config: parseConfig,
  sentence: parseSentence,
});
