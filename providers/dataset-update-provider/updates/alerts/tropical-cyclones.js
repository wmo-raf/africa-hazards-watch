import { closestIndexTo } from "date-fns";
import { lineString } from "@turf/helpers";

import { getStorms } from "services/tropical-cyclones";

const getColorSSHWS = (windSpeed) => {
  if (!windSpeed) {
    return "#FFFFFF";
  }

  switch (true) {
    case windSpeed < 5:
      return "#FFFFFF";
    case windSpeed < 34:
      return "#8FC2F2";
    case windSpeed < 64:
      return "#3185D3";
    case windSpeed < 83:
      return "#FFFF00";
    case windSpeed < 96:
      return "#FF9E00";
    case windSpeed < 113:
      return "#DD0000";
    case windSpeed < 137:
      return "#FF00FC";
    default:
      return "#8B0088";
  }
};

export default {
  layer: "tropical_cyclones",
  getData: async (token) => {
    const storms = await getStorms();

    const stormsData = storms.data;

    const featureCollection = stormsData.reduce(
      (all, storm) => {
        const stormFeatures = [];

        const sortedTrack = storm.track.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        const forecasts = storm.track.filter((p) => p.forecast);
        const observed = storm.track.filter((p) => !p.forecast);

        const earliestForecast = forecasts && forecasts[0];
        const latestObserved = observed[observed.length - 1];

        let includeForecast = true;

        if (earliestForecast && latestObserved) {
          if (new Date(latestObserved.date) > new Date(earliestForecast.date)) {
            // includeForecast = false;
          }
        }

        for (let index = 0; index < sortedTrack.length; index++) {
          const point = sortedTrack[index];

          const color = getColorSSHWS(point.wind);

          if (point.forecast && !includeForecast) {
            continue;
          }

          const feature = {
            type: "Feature",
            geometry: { type: "Point", coordinates: [point.lon, point.lat] },
            properties: {
              storm_id: storm.id,
              storm_name: storm.name,
              ...point,
              color: color,
            },
          };

          stormFeatures.push(feature);
        }

        const lines = stormFeatures.reduce((all, item, idx) => {
          // first one
          if (idx === 0) {
            const current = stormFeatures[idx];
            const next = stormFeatures[idx + 1];
            const line = lineString(
              [
                [
                  current.geometry.coordinates[0],
                  current.geometry.coordinates[1],
                ],
                [next.geometry.coordinates[0], next.geometry.coordinates[1]],
              ],
              item.properties
            );

            all.push(line);
          } else if (idx !== stormFeatures.length - 1) {
            // not last one
            const current = stormFeatures[idx];
            const next = stormFeatures[idx + 1];
            const line = lineString(
              [
                [
                  current.geometry.coordinates[0],
                  current.geometry.coordinates[1],
                ],
                [next.geometry.coordinates[0], next.geometry.coordinates[1]],
              ],
              item.properties
            );

            all.push(line);
          }

          return all;
        }, []);

        // find closest point to now
        const currentTime = new Date();
        const closestIndex = closestIndexTo(
          currentTime,
          stormFeatures.map((f) => new Date(f.properties.date))
        );

        // add this to show closest
        if (closestIndex) {
          const pulse = stormFeatures[closestIndex];

          pulse.properties.currentPosition = true;

          stormFeatures.push(pulse);
        }

        all.features = all.features.concat(stormFeatures, lines);

        return all;
      },
      {
        type: "FeatureCollection",
        features: [],
      }
    );

    return featureCollection;
  },
  updateInterval: 1000 * 60 * 5, // every 5 minutes
  zoomToDataExtent: false,
};
