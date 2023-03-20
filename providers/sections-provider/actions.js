import { createAction, createThunkAction } from "redux/actions";

import localCategories from "./categories.json";

export const setSectionsLoading = createAction("setSectionsLoading");
export const setSections = createAction("setSections");
export const setSubCategorySettings = createAction("setSubCategorySettings");

export const fetchSections = createThunkAction(
  "fetchSections",
  () => (dispatch) => {
    dispatch(setSectionsLoading({ loading: true, error: false }));

    // set local sections
    const sections = localCategories
      .filter((l) => l.active)
      .map((s) => ({
        label: "layers",
        slug: "datasets",
        category: s.title,
        id: s.id,
        icon: s.icon,
        subCategories: s.sub_categories
          .filter((s) => s.active)
          .map((subcat) => ({
            ...subcat,
            id: subcat.id,
            title: subcat.title,
            slug: subcat.id,
          })),
      }));

    dispatch(setSections(sections));
  }
);
