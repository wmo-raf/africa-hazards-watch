import { createThunkAction } from "redux/actions";

import useRouter from "utils/router";

export const handleLocationChange = createThunkAction(
  "handleLocationChange",
  (location) => (dispatch, getState) => {
    const { type, payload, query } = getState().location || {};
    const { pushQuery } = useRouter();

    const newQuery = {};

    let newPayload = {};

    newPayload = {
      type: payload.type,
      ...location,
    };

    pushQuery({
      pathname: `/topics/climate-change/${Object.values(newPayload)
        ?.filter((o) => o)
        ?.join("/")}/`,
      query: {
        ...newQuery,
        location: Object.values(newPayload),
      },
    });
  }
);
