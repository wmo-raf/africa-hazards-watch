import { ASAP_AFRICA_COUNTRIES } from "./data";

const arrayendDekadsDate = {
  1: "21-31",
  2: "21-28",
  3: "21-31",
  4: "21-30",
  5: "21-31",
  6: "21-30",
  7: "21-31",
  8: "21-31",
  9: "21-30",
  10: "21-31",
  11: "21-30",
  12: "21-31",
  leap: "21-29",
};

//Add zeros to left
function pad_with_zeroes(number, length) {
  let my_string = "" + number;
  while (my_string.length < length) {
    my_string = "0" + my_string;
  }

  return my_string;
}

//Function to know if a year is a leap year
function isleap(yr) {
  if (parseInt(yr) % 4 == 0) {
    if (parseInt(yr) % 100 == 0) {
      if (parseInt(yr) % 400 != 0) {
        return false;
      }
      if (parseInt(yr) % 400 == 0) {
        return true;
      }
    }
    if (parseInt(yr) % 100 != 0) {
      return true;
    }
  }
  if (parseInt(yr) % 4 != 0) {
    return false;
  }
}

function getStringDekadText(month, year) {
  let stringDekadText;
  if (month == 2) {
    let checkLeapYear = isleap(year);
    stringDekadText = checkLeapYear
      ? arrayendDekadsDate["leap"]
      : arrayendDekadsDate[month];
  } else {
    stringDekadText = arrayendDekadsDate[month];
  }
  return stringDekadText;
}

//Funtion to get Dekad of the year
function dekadOfYear(actualMonth, actualDate) {
  let dekadofYear;
  dekadofYear = actualMonth * 3;
  switch (true) {
    case actualDate < 11:
      dekadofYear = dekadofYear - 2;
      break;
    case actualDate >= 11 && actualDate <= 20:
      dekadofYear = dekadofYear - 1;
      break;
    case actualDate >= 21 && actualDate < 32:
      dekadofYear = dekadofYear;
      break;
  }
  return dekadofYear;
}

//Function to get Dekad of month
function dekadOfMonth(actualDate) {
  let dekadofMonth;
  switch (true) {
    case actualDate < 11:
      dekadofMonth = 1;
      break;
    case actualDate > 10 && actualDate <= 20:
      dekadofMonth = 2;
      break;
    case actualDate >= 21 && actualDate < 32:
      dekadofMonth = 3;
      break;
  }
  return dekadofMonth;
}

//Function to fill ComboDates
export function getDatesOptions(
  refDate,
  startYear = new Date().getFullYear() - 1
) {
  const dateOptions = [];

  let dateOption, arrayReferenceDate, actualYear, actualMonth, actualDate;
  dateOption = "";

  arrayReferenceDate = refDate.split("-");

  actualYear = arrayReferenceDate[0];
  actualMonth = parseInt(arrayReferenceDate[1], 10);
  actualDate = arrayReferenceDate[2];

  for (let year = actualYear; year >= startYear; year--) {
    let stringMonth, stringDekad, stringDekadText, AnualDekad;

    if (year == actualYear) {
      let dekadofYear = dekadOfYear(actualMonth, parseInt(actualDate));
      let dekadofMonth = dekadOfMonth(parseInt(actualDate));
      for (let month = actualMonth; month >= 1; month--) {
        if (month < 10) {
          stringMonth = "0" + String(month);
        } else {
          stringMonth = String(month);
        }

        let e;

        month == actualMonth && dekadofMonth != 3
          ? (e = dekadofMonth)
          : (e = 3);

        for (let Dekad = e; Dekad >= 1; Dekad--) {
          switch (Dekad) {
            case 1:
              stringDekad = "01";
              stringDekadText = "01-10";
              break;
            case 2:
              stringDekad = "11";
              stringDekadText = stringDekadText = "11-20";
              break;
            case 3:
              stringDekad = "21";
              stringDekadText = getStringDekadText(month, year);
              break;
          }

          let dekadofYearText = pad_with_zeroes(dekadofYear, 2);

          let id = String(year) + "-" + stringMonth + "-" + stringDekad;
          let text =
            stringDekadText +
            "/" +
            stringMonth +
            "/" +
            String(year) +
            " (D" +
            dekadofYearText +
            ")";

          dateOption = { label: text, value: id };

          dateOptions.push(dateOption);

          dekadofYear = --dekadofYear;
        }
      }
    } else {
      let AnualDekad = 36;
      for (let month = 12; month >= 1; month--) {
        if (month < 10) {
          stringMonth = "0" + String(month);
        } else {
          stringMonth = String(month);
        }
        for (let Dekad = 3; Dekad >= 1; Dekad--) {
          switch (Dekad) {
            case 1:
              stringDekad = "01";
              stringDekadText = "01-10";
              break;
            case 2:
              stringDekad = "11";
              stringDekadText = stringDekadText = "11-20";
              break;
            case 3:
              stringDekad = "21";
              stringDekadText = getStringDekadText(month, year);
              break;
          }

          let AnualDekadText = pad_with_zeroes(AnualDekad, 2);

          let id = String(year) + "-" + stringMonth + "-" + stringDekad;
          let text =
            stringDekadText +
            "/" +
            stringMonth +
            "/" +
            String(year) +
            " (D" +
            AnualDekadText +
            ")";
          dateOption = { label: text, value: id };

          dateOptions.push(dateOption);

          AnualDekad = --AnualDekad;
        }
      }
    }
  }

  return dateOptions;
}

export const CQL_AFRICA_FILTER = ASAP_AFRICA_COUNTRIES.map(
  (c) => `adm0_code = ${c.adm0_code}`
).join(" OR ");
