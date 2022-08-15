import { all, spread } from "axios";
import bbox from "turf-bbox";

import { mapboxGeocodingRequest, pgFeatureServRequest } from "utils/request";
import { POLITICAL_BOUNDARIES } from "data/layers";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const EA_BBOX = [21.838949, -11.745695, 51.415695, 23.145147];

export const fetchGeocodeLocations = (
  searchQuery = "",
  lang = "en",
  cancelToken
) => {
  return all([
    mapboxGeocodingRequest
      .get(
        `/${searchQuery}.json?language=${lang}&access_token=${MAPBOX_ACCESS_TOKEN}&types=district,region,place,locality,neighborhood,address&&bbox=${EA_BBOX.toString()}`,
        {
          cancelToken,
        }
      )
      .catch(() => {}),
    pgFeatureServRequest
      .get(`/functions/ea_admin_by_name/items.json?search_name=${searchQuery}`)
      .catch(() => {
        return { data: [] };
      }),
  ]).then(
    spread((mapboxResponse, pgFeatureServResponse) => {
      const boundaries = pgFeatureServResponse?.data?.rows?.map((c) => {
        return {
          ...c,
          source: "pgfeatureserv",
          id: POLITICAL_BOUNDARIES,
          bbox: bbox(JSON.parse(c.bbox)),
          center: JSON.parse(c.centroid)?.coordinates,
        };
      });

      return boundaries.concat(mapboxResponse?.data?.features);
    })
  );
};

export const fetchReverseGeocodePoint = ({ lat, lng, cancelToken }) => {
  return mapboxGeocodingRequest
    .get(
      `/${lng},${lat}.json?language=en&access_token=${MAPBOX_ACCESS_TOKEN}&types=district,region,place,locality,neighborhood,address&bbox=${EA_BBOX.toString()}&limit=1`,
      {
        cancelToken,
      }
    )
    .then((mapboxResponse) => {
      return mapboxResponse?.data?.features;
    })
    .catch(() => {});
};
