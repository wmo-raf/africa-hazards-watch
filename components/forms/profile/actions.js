import { createThunkAction } from "redux/actions";
import { FORM_ERROR } from "final-form";

import { updateProfile } from "services/user";
import { setMyHw } from "providers/myhw-provider/actions";

export const saveProfile = createThunkAction(
  "saveProfile",
  ({
    id,
    signUpForNewsletter,
    subsector,
    subsector_otherInput,
    howDoYouUse,
    howDoYouUse_otherInput,
    ...rest
  }) => (dispatch) => {
    const postData = {
      id,
      ...rest,
      subsector:
        subsector && subsector.includes("Other")
          ? `Other: ${subsector_otherInput || ""}`
          : subsector,
      howDoYouUse:
        howDoYouUse && howDoYouUse.includes("Other")
          ? [
              ...howDoYouUse.filter((use) => use !== "Other"),
              `Other: ${howDoYouUse_otherInput || ""}`,
            ]
          : howDoYouUse,
      signUpForNewsletter:
        !!signUpForNewsletter &&
        signUpForNewsletter.length &&
        signUpForNewsletter.includes("newsletter")
          ? "true"
          : false,
    };

    return updateProfile(id, postData)
      .then((response) => {
        if (response.data && response.data.data) {
          const { attributes } = response.data.data;
          dispatch(
            setMyGFW({
              loggedIn: true,
              id: response.data.data.id,
              ...attributes,
            })
          );
        }

        return true;
      })
      .catch((error) => {
        const { errors } = error.response.data;

        return {
          [FORM_ERROR]: errors[0].detail,
        };
      });
  }
);
