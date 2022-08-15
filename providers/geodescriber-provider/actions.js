import { createAction, createThunkAction } from "redux/actions";
import isEmpty from "lodash/isEmpty";

import { getGeodescriberByGeoJson } from "services/geodescriber";

export const setGeodescriberLoading = createAction("setGeodescriberLoading");
export const setGeodescriber = createAction("setGeodescriber");
export const clearGeodescriber = createAction("clearGeodescriber");

export const setGeodescriberSSR = (payload) => setGeodescriber(payload);

export const getGeodescriber = createThunkAction(
  "getGeodescriber",
  (params) => (dispatch) => {
    if (!isEmpty(params)) {
      dispatch(setGeodescriberLoading({ loading: true, error: false }));
      getGeodescriberByGeoJson({ ...params, template: true })
        .then((response) => {
          dispatch(setGeodescriber(response.data.attributes));
        })
        .catch(() => {
          dispatch(setGeodescriberLoading({ loading: false, error: true }));
        });
    }
  }
);
