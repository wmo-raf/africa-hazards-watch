import { createStructuredSelector } from "reselect";

import { selectActiveLang } from "utils/lang";

const selectLoading = (state) => state.mapMenu && state.mapMenu.loading;

export const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  lang: selectActiveLang,
});
