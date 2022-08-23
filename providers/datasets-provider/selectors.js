import { createStructuredSelector } from "reselect";
import { getActiveDatasetsFromState } from "components/map/selectors";

export const getDatasetProps = createStructuredSelector({
  activeDatasets: getActiveDatasetsFromState,
});
