import { createStructuredSelector } from "reselect";

const selectLoggedIn = (state) => state.myHw?.data?.loggedIn;
const selectMyHwLoading = (state) => state.myHw?.loading;

export const getMyHwProps = createStructuredSelector({
  loggingIn: selectMyHwLoading,
  loggedIn: selectLoggedIn,
});
