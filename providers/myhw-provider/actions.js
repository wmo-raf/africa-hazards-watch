import { createAction, createThunkAction } from "redux/actions";

import { checkLoggedIn, getProfile } from "services/user";

const isServer = typeof window === "undefined";

export const setMyHWLoading = createAction("setMyHWLoading");
export const setMyHW = createAction("setMyHW");

export const getUserProfile = createThunkAction(
  "getUserProfile",
  (urlToken) => (dispatch) => {
    const token = !isServer && (urlToken || localStorage.getItem("userToken"));
    if (token) {
      dispatch(setMyHWLoading({ loading: true, error: false }));
      checkLoggedIn(token)
        .then((authResponse) => {
          getProfile(authResponse.data.id)
            .then((response) => {
              if (response.status < 400 && response.data) {
                const { data } = response.data;

                dispatch(
                  setMyHW({
                    loggedIn: true,
                    id: authResponse.data.id,
                    ...(data && data.attributes),
                  })
                );
              }
            })
            .catch(() => {
              dispatch(
                setMyHW({
                  loggedIn: true,
                  ...authResponse.data,
                })
              );
            });
        })
        .catch(() => {
          dispatch(setMyHWLoading({ loading: false, error: true }));
        });
    }
  }
);
