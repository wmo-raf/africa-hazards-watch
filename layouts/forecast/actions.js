import { createThunkAction } from "redux/actions";
import useRouter from "utils/router";

export const handleLocationChange = createThunkAction(
  "handleLocationChange",
  (location) => (dispatch, getState) => {
    const { payload, query } = getState().location || {};
    const { pushQuery } = useRouter();

    let newPayload = {};

    newPayload = {
      type: payload.type,
      ...location,
    };

    pushQuery({
      pathname: `/forecast/${Object.values(newPayload)
        ?.filter((o) => o)
        ?.join("/")}/`,
      query: {
        ...query,
      },
    });
  }
);
