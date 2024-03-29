import { createStructuredSelector } from 'reselect';

import { checkUserProfileFilled } from 'utils/user';

const selectProfileComplete = (state) =>
  checkUserProfileFilled(state?.myHw?.data);

export const getProfileModalProps = createStructuredSelector({
  profileComplete: selectProfileComplete,
});
