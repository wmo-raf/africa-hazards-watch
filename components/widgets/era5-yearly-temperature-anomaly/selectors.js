import { createSelector, createStructuredSelector } from "reselect";
import { formatNumber, formatWeekday } from "utils/format";
import { parseISO, addDays } from "date-fns";

const getData = (state) => state.data && state.data;
const getCurrentLocation = (state) => state.locationLabel;
const getColors = (state) => state.colors;
const getSentences = (state) => state.sentences;

export const getColor = (val) => {
  if (val > 0) {
    return "#c82808";
  }

  return "#4582b5";
};

export const parseData = createSelector(
  [getData, getColors],
  (data, colors) => {
    if (!data) return null;

    const byYear = data.reduce((all, item) => {
      const date = parseISO(item.date);
      const year = date.getFullYear();
      const dValue = { value: item.value };
      if (all[year]) {
        all[year].push(dValue);
      } else {
        all[year] = [dValue];
      }
      return all;
    }, {});

    const dataByYear = Object.keys(byYear).reduce((all, year) => {
      const mean = byYear[year].reduce((avg, item, _, { length }) => {
        return avg + item.value / length;
      }, 0);

      all.push({ year, mean, color: getColor(mean) });

      return all;
    }, []);

    return dataByYear;

    // return data.map((d) => ({
    //   month: d.date,
    //   value: d.value,
    //   color: getColor(d.value),
    // }));
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
  unit: " °C",
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
      label: "Temperature",
      // unitFormat: (value) => formatNumber({ num: value, unit: "°C" }),
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
