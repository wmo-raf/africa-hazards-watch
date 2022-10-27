import request from "utils/request";

const GSKY_WPS_URL = "http://197.254.13.228:8081/data-api/v1/gsky/timeseries";

export const fetchGskyWps = ({
  identifier,
  feature,
  startDateTimeParam,
  endDateTimeParam,
  token,
  owsNameSpace,
}) => {
  const params = {
    identifier: identifier,
  };

  if (startDateTimeParam) {
    params.start_datetime = startDateTimeParam;
  }

  if (endDateTimeParam) {
    params.end_datetime = endDateTimeParam;
  }

  if (owsNameSpace) {
    params.ows_namespace = owsNameSpace;
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
