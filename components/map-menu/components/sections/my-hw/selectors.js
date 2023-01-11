import { createStructuredSelector, createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";

import {
  getUserAreas,
  getActiveArea,
  getAreaTags,
} from "providers/areas-provider/selectors";

import { getAllMyDatasets } from "providers/mydata-provider/selectors";

import { getActiveDatasetsFromState } from "components/map/selectors";

const selectLoading = (state) =>
  state.areas && state.myHw && (state.areas.loading || state.myHw.loading);
const selectLoggedIn = (state) => state.myHw && !isEmpty(state.myHw.data);
const selectLocation = (state) => state.location && state.location.payload;
const selectUserData = (state) => state.myHw && state.myHw.data;
const selectSection = (state) => state.mapMenu.settings.myHWType;
const selectDatasets = (state) => state.datasets && state.datasets.data;

const getSortedAreas = createSelector(
  getUserAreas,
  (areas) => areas && sortBy(areas, "createdAt").reverse()
);

const getSortedMyDatasets = createSelector(
  [getAllMyDatasets, selectDatasets, getActiveDatasetsFromState],
  (myDatasets, datasets, activeDatasets) => {
    const activeDatasetIds = activeDatasets.map((d) => d.dataset);

    const userDatasets = datasets.filter((d) => d.userDataset).map((d) => d.id);

    return (
      myDatasets &&
      sortBy(myDatasets, "created_on")
        .reverse()
        .filter((d) => userDatasets.includes(d.mapDataset.id))
        .map((d) => datasets.find((ds) => d.mapDataset.id == ds.id))
        .map((d) => ({ ...d, active: activeDatasetIds.includes(d.id) }))
    );
  }
);

export const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  loggedIn: selectLoggedIn,
  location: selectLocation,
  areas: getSortedAreas,
  tags: getAreaTags,
  activeArea: getActiveArea,
  userData: selectUserData,
  section: selectSection,
  myDatasets: getSortedMyDatasets,
});
