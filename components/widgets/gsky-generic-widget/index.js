import { fetchGskyWps } from "services/gsky-wps";
import { parseISO, addDays } from "date-fns";

import getWidgetProps from "./selectors";

const getWidget = (config) => {
  return {
    ...config,
    getData: (params) => {
      const {
        endpoint,
        geostore: { info, geojson, id },
        isPoint,
        adm0,
        adm1,
        type,
        adm2,
        isAnalysis,
        wpsIdentifier,
        owsNameSpace,
        token,
      } = params;

      const { time } = params;

      const startDateTime = parseISO(time);

      const endDateTime = addDays(startDateTime, 5).toISOString();

      // const startDateTimeParam = time.substring(0, 16);
      const endDateTimeParam = time.substring(0, 16);

      // if point, make a FeatureCollection and run analysis
      if (isPoint) {
        const featurePayload = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [Number(adm1), Number(adm0)],
              },
            },
          ],
        };
        return fetchGskyWps({
          identifier: wpsIdentifier,
          feature: featurePayload,
          // startDateTimeParam: startDateTimeParam,
          endDateTimeParam: endDateTimeParam,
          owsNameSpace: owsNameSpace,
          token: token,
        }).then((res) => res.data);
      } else {
        const feature = geojson && geojson.features ? geojson.features[0] : {};

        const featurePayload = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: feature.geometry.type,
                coordinates: feature.geometry.coordinates,
              },
            },
          ],
        };

        return fetchGskyWps({
          identifier: wpsIdentifier,
          feature: featurePayload,
          // startDateTimeParam: startDateTimeParam,
          endDateTimeParam: endDateTimeParam,
          owsNameSpace: owsNameSpace,
          token: token,
        }).then((res) => res.data);
      }
    },
    getWidgetProps,
  };
};

export default getWidget;
