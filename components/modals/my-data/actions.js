import { createThunkAction } from "redux/actions";
import useRouter from "utils/router";

export const setMyDataModalSettings = createThunkAction(
  "setMyDataModalSettings",
  (settings) => () => {
    const { myDatasetId, myDataIntent } = settings || {};

    const { query, asPath, pushQuery } = useRouter();

    pushQuery({
      pathname: asPath?.split("?")?.[0],
      query: {
        ...query,
        myDatasetId: myDatasetId || null,
        myDataIntent: myDataIntent || null,
      },
    });
  }
);
