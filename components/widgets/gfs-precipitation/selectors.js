import { createSelector, createStructuredSelector } from "reselect";
import { formatNumber, formatWeekday, formatHour } from "utils/format";

const getData = (state) => state.data && state.data;
const getCurrentLocation = (state) => state.locationLabel;
const getColors = (state) => state.colors;
const getSentences = (state) => state.sentences;

export const parseData = createSelector(
  [getData, getColors],
  (data, colors) => {
    if (!data) return null;
    return data;
  }
);

const parseConfig = createSelector([getColors], (colors) => ({
  simpleNeedsAxis: true,
  height: 250,
  xKey: "date",
  yKeys: {
    areas: {
      value: {
        stroke: colors.rainfall,
        yAxisId: "value",
      },
    },
  },
  unit: " mm",
  xAxis: {
    tickFormatter: formatWeekday,
  },
  yAxis: {
    yAxisId: "value",
  },
  tooltip: [
    {
      key: "date",
      label: "Date",
      unitFormat: (value) => value && formatHour(value),
    },
    {
      key: "value",
      label: "Precipitation",
      unitFormat: (value) => formatNumber({ num: value, unit: "mm" }),
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
