import { createSelector, createStructuredSelector } from "reselect";
import { gskyWpsPrecipitationDataByYear } from "utils/data";
import { formatNumber, formatWeekday } from "utils/format";

const getData = (state) => state.data && state.data;
const getCurrentLocation = (state) => state.locationLabel;
const getColors = (state) => state.colors;
const getSentences = (state) => state.sentences;

export const getColor = (val) => {
  if (val > 0) {
    return "#38a090";
  }

  return "#c08729";
};

export const parseData = createSelector(
  [getData, getColors],
  (data, colors) => {
    if (!data) return null;

    const dataByYear = gskyWpsPrecipitationDataByYear(data).map((v) => ({
      ...v,
      color: getColor(v.mean),
    }));

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
        yAxisId: "mean",
        itemColor: true,
      },
    },
  },
  unit: " mm",
  yAxis: {
    yAxisId: "mean",
    domain: ["auto", "auto"],
  },
  referenceLine: {
    y: 0,
    yAxisId: "mean",
  },
  tooltip: [
    {
      key: "year",
      label: "Year",
    },
    {
      key: "mean",
      label: "Anomaly",
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
