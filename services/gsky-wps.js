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
  };

  if (startDateTimeParam) {
    params.start_datetime = startDateTimeParam;
  }

  if (endDateTimeParam) {
    params.end_datetime = endDateTimeParam;
  }

  return request
    .post(
      `${GSKY_WPS_URL}`,
      { ...feature },
      { params, cancelToken: token, timeout: 120 * 1000 }
    )
    .then((res) => {
      return { identifier: identifier, data: res.data.data };
    });
};
