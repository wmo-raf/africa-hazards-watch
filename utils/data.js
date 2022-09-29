import reduce from "lodash/reduce";
import isEqual from "lodash/isEqual";
import { parseISO } from "date-fns";

export const objDiff = (obj1, obj2) => {
  return reduce(
    obj1,
    (result, value, key) => {
      if (!isEqual(value, obj2[key])) {
        result[key] = value;
      }
      return result;
    },
    {}
  );
};

export const gskyWpsDataByYear = (data, add) => {
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
    let mean = byYear[year].reduce((avg, item, _, { length }) => {
      return avg + item.value / length;
    }, 0);

    if (add) {
      mean = mean + add;
    }

    all.push({ year, mean });

    return all;
  }, []);

  return dataByYear;
};
