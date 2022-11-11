import { parseISO } from "date-fns";
import { createSelector, createStructuredSelector } from "reselect";
import {
  formatNumber,
  formatDate,
  formatWeekday,
  formatHour,
} from "utils/format";

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
    lines: {
      value: {
        stroke: colors.temperature,
        yAxisId: "value",
      },
    },
  },
  unit: " °C",
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
      label: "Temperature",
      unitFormat: (value) => formatNumber({ num: value, unit: "°C" }),
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
