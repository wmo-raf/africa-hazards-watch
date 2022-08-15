import { createThunkAction } from "redux/actions";
import { FORM_ERROR } from "final-form";

import { saveArea, deleteArea } from "services/areas";

import {
  setArea,
  setAreas,
  viewArea,
  clearArea,
} from "providers/areas-provider/actions";

export const saveAreaOfInterest = createThunkAction(
  "saveAreaOfInterest",
  ({
    id,
    name,
    tags,
    email,
    webhookUrl,
    language,
    updates,
    admin,
    wdpaid,
    use,
    application,
    viewAfterSave,
    geostore: geostoreId,
    mapStyle,
  }) => (dispatch, getState) => {
    const { location, geostore } = getState();
    const { data: geostoreData } = geostore || {};
    const {
      payload: { type, adm0, adm1, adm2 },
    } = location || {};
    const isCountry = type === "country";

    const postData = {
      id,
      name,
      ...(bounds && {
        mapStyle: {
          ...mapStyle,
          bounds: bounds,
          padding: 6,
        },
      }),
      type,
      application: application || "ahw",
      geostore: geostoreId || (geostoreData && geostoreData.id),
      email,
      language: "en",
      weeklyForecastUpdates: updates.includes("weeklyForecastUpdates"),
      dekadalDroughtUpdates: updates.includes("dekadalDroughtUpdates"),
      foodSecurityUpdates: updates.includes("foodSecurityUpdates"),
      ...(admin && {
        admin,
      }),
      ...(wdpaid && {
        wdpaid,
      }),
      ...(use && {
        use,
      }),
      ...(isCountry && {
        admin: {
          adm0,
          adm1,
          adm2,
        },
      }),
      ...(type === "use" && {
        use: {
          id: adm1,
          name: adm0,
        },
      }),
      ...(webhookUrl && {
        webhookUrl,
      }),
      tags: tags || [],
      public: true,
      ...(isCountry && {
        status: "saved",
      }),
    };

    return saveArea(postData)
      .then((area) => {
        dispatch(setArea({ ...area, userArea: true }));
        if (viewAfterSave) {
          dispatch(viewArea({ areaId: area.id }));
        }
      })
      .catch((error) => {
        let { errors } = (error.response && error.response.data) || [];

        let err = errors && errors[0] && errors[0].detail;

        if (!err && error.message) {
          err = error.message;
        }

        return {
          [FORM_ERROR]: err,
        };
      });
  }
);

export const deleteAreaOfInterest = createThunkAction(
  "deleteAreaOfInterest",
  ({ id, clearAfterDelete, callBack }) => (dispatch, getState) => {
    const { data: areas } = getState().areas || {};

    return deleteArea(id)
      .then(() => {
        dispatch(setAreas(areas.filter((a) => a.id !== id)));
        if (clearAfterDelete) {
          dispatch(clearArea());
        }
        if (callBack) {
          callBack();
        }
      })
      .catch((error) => {
        const { errors } = error.response.data;

        return {
          [FORM_ERROR]: errors[0].detail,
        };
      });
  }
);
