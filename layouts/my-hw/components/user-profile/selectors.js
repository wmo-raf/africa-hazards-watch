import { createStructuredSelector } from 'reselect';

const selectUserData = (state) => state.myHw && state.myHw.data;

export const getUserProfleProps = createStructuredSelector({
  userData: selectUserData,
});
