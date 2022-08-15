import request from "utils/request";

const GSKY_WPS_URL = "http://localhost/data-api/v1/gsky/timeseries";

export const fetchGskyWps = (
  identifier,
  feature,
  startDateTimeParam,
  endDateTimeParam,
  token
) => {
  const params = {
    identifier: identifier,
    start_datetime: startDateTimeParam,
    end_datetime: endDateTimeParam,
  };

  return request
    .post(`${GSKY_WPS_URL}`, { ...feature }, { params, cancelToken: token })
    .then((res) => {
      return res.data[identifier];
    });
};
