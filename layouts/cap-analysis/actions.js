import { all, spread } from "axios";

import { createAction, createThunkAction } from "redux/actions";
import { getAlertDetail } from "services/cap-alerts";
import { saveGeostore } from "services/geostore";
import { getAreaIntersectAnalysis } from "services/area-analysis";

export const setCapGeostore = createAction("setCapGeostore");
export const setCapAnalysis = createAction("setCapAnalysis");
export const setCapLoading = createAction("setCapLoading");
export const setCapAlert = createAction("setCapAlert");

const DEFAULT_ANALYSIS_LAYERS = ["airports", "power_plants", "dams"];

export const fetchCapDetail = createThunkAction(
  "fetchCapDetail",
  (capUrl) => (dispatch) => {
    dispatch(setCapLoading({ loading: true, error: "" }));

    getAlertDetail(capUrl)
      .then((capData) => {
        dispatch(setCapAlert(capData));

        dispatch(setCapLoading({ loading: false, error: "" }));

        if (capData.alert) {
          const { area } = capData.alert.info;

          if (area && area.features) {
            dispatch(
              getAlertsAnalysis({
                features: area.features,
                layers: DEFAULT_ANALYSIS_LAYERS,
              })
            );

            dispatch(getAlertsGeostoreIds(area.features));
          }
        }
      })
      .catch((error) => {
        console.log(error);

        dispatch(setCapLoading({ loading: false, error: error }));
      });
  }
);

export const getAlertsGeostoreIds = createThunkAction(
  "getAlertsGeostoreIds",
  (features) => (dispatch) => {
    dispatch(setCapGeostore({ loading: true, data: {} }));

    if (features) {
      const geostoreRequests = features.map((feat) => {
        return saveGeostore(feat).then((res) => {
          const data = res.data;
          data.alertId = feat.id;
          return data;
        });
      });

      all(geostoreRequests)
        .then(
          spread((...responses) => {
            const geostores = responses.reduce((all, item) => {
              const gItem = { alertId: item.alertId, geostoreId: item.data.id };
              all[gItem.alertId] = gItem;
              return all;
            }, {});

            dispatch(setCapGeostore({ loading: false, data: geostores }));
          })
        )
        .catch((error) => {
          console.log(error);
          dispatch(setCapGeostore({ loading: false, data: {} }));
        });
    }
  }
);

export const getAlertsAnalysis = createThunkAction(
  "getAlertsAnalysis",
  ({ features, layers }) => (dispatch) => {
    dispatch(setCapAnalysis({ loading: true, data: {} }));

    if (features && layers) {
      const analysisRequests = features.reduce((all, feat) => {
        layers.forEach((layer) => {
          const geojson = { type: "FeatureCollection", features: [feat] };

          all.push(
            getAreaIntersectAnalysis(layer, {
              geojson,
              geojsonId: feat.id,
            }).then((res) => {
              const data = { data: res, alertId: feat.id, layer: layer };

              return data;
            })
          );
        });

        return all;
      }, []);
      all(analysisRequests)
        .then(
          spread((...responses) => {
            const analysis = responses.reduce((all, item) => {
              if (!all[item.alertId]) {
                all[item.alertId] = {};
              }
              all[item.alertId][item.layer] = item;
              return all;
            }, {});

            dispatch(setCapAnalysis({ loading: false, data: analysis }));
          })
        )
        .catch((error) => {
          console.log(error);
          dispatch(setCapAnalysis({ loading: false, data: {} }));
        });
    }
  }
);
