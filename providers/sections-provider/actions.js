import { createAction, createThunkAction } from "redux/actions";

import { getCategories } from "services/sections";

import localCategories from "./categories.json";

export const setSectionsLoading = createAction("setSectionsLoading");
export const setSections = createAction("setSections");

export const fetchSections = createThunkAction(
  "fetchSections",
  () => (dispatch) => {
    dispatch(setSectionsLoading({ loading: true, error: false }));

    // set local sections
    const sections =
      localCategories.data &&
      localCategories.data.objects &&
      localCategories.data.objects.length &&
      localCategories.data.objects
        .filter((l) => l.active)
        .map((s) => ({
          label: "layers",
          slug: "datasets",
          category: s.title,
          id: s.id,
          icon: s.icon,
          subCategories: s.sub_categories.map((subcat) => ({
            id: subcat.id,
            title: subcat.title,
            slug: subcat.id,
          })),
        }));

    dispatch(setSections(sections));

    // // get categories from API
    // getCategories()
    //   .then((allCategories) => {
    //     const sections =
    //       allCategories.data &&
    //       allCategories.data.objects &&
    //       allCategories.data.objects.length &&
    //       allCategories.data.objects.map((s) => ({
    //         label: "layers",
    //         slug: "datasets",
    //         category: s.title,
    //         id: s.id,
    //         icon: s.icon,
    //         subCategories: s.sub_categories.map((subcat) => ({
    //           id: subcat.id,
    //           title: subcat.title,
    //           slug: subcat.id,
    //         })),
    //       }));

    //     dispatch(setSections(sections));
    //   })
    //   .catch((err) => {
    //     dispatch(setSectionsLoading({ loading: false, error: true }));
    //   });
  }
);
