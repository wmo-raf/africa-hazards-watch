import { parse } from "cookie";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import useRouter from "utils/router";
import { decodeQueryParams } from "utils/url";

import { getLocationData } from "services/location";

import FullscreenLayout from "wrappers/fullscreen";
import Map from "layouts/map";

import MapUrlProvider from "providers/map-url-provider";
import LocationProvider from "providers/location-provider";

import { setMapSettings } from "components/map/actions";
import { setMainMapSettings } from "layouts/map/actions";
import { setMenuSettings } from "components/map-menu/actions";
import { setAnalysisSettings } from "components/analysis/actions";
import { setModalMetaSettings } from "components/modals/meta/actions";
import { setMapPrompts } from "components/prompts/map-prompts/actions";

const notFoundProps = {
  error: 404,
  title: "Location Not Found | Hazards Watch",
  errorTitle: "Location Not Found",
};

const ALLOWED_TYPES = ["africa", "country", "use", "geostore", "aoi", "point"];

export const getServerSideProps = async ({ req, params }) => {
  const [type] = params?.location || [];

  if (type && !ALLOWED_TYPES.includes(type)) {
    return {
      props: notFoundProps,
    };
  }

  if (!type || type === "africa") {
    return {
      props: {
        title: "Hazards Watch | AHW",
        description: "Monitoring Hazards in Africa",
      },
    };
  }

  if (type === "country") {
    return {
      props: {
        title: "Interactive Hazards Map for Country | AHW",
      },
    };
  }

  if (type === "aoi") {
    return {
      props: {
        title: "Interactive Hazards Map for AOI | AHW",
      },
    };
  }

  if (type === "point") {
    return {
      props: {
        title: "Interactive Hazards Map for custom point | AHW",
      },
    };
  }

  if (type === "geostore") {
    return {
      props: {
        title: "Interactive Hazards Map for custom area | AHW",
      },
    };
  }

  try {
    const locationData = await getLocationData(params?.location);

    const { locationName } = locationData || {};

    if (!locationName) {
      return {
        props: notFoundProps,
      };
    }

    const title = `${locationName} Hazards Map | AHW`;

    const description = `Monitoring Hazards in Africa`;
    const noIndex = !["country"].includes(type);

    return {
      props: {
        title,
        description,
        noIndex,
      },
    };
  } catch (err) {
    if (err?.response?.status === 401) {
      return {
        props: {
          error: 401,
          title: "Area is private | Hazards Watch",
          errorTitle: "Area is private",
        },
      };
    }

    return {
      props: notFoundProps,
    };
  }
};

const MapPage = (props) => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const { query, asPath, isFallback } = useRouter();
  const fullPathname = asPath?.split("?")?.[0];

  useEffect(() => {
    const { map, mainMap, mapMenu, analysis, modalMeta, mapPrompts } =
      decodeQueryParams(query) || {};

    if (map) {
      dispatch(setMapSettings(map));
    }

    if (mainMap) {
      dispatch(setMainMapSettings(mainMap));
    }

    if (mapMenu) {
      dispatch(setMenuSettings(mapMenu));
    }

    if (analysis) {
      dispatch(setAnalysisSettings(analysis));
    }

    if (modalMeta) {
      dispatch(setModalMetaSettings(modalMeta));
    }

    if (mapPrompts) {
      dispatch(setMapPrompts(mapPrompts));
    }
  }, [fullPathname, isFallback]);

  // when setting the query params from the URL we need to make sure we don't render the map
  // on the server otherwise the DOM will be out of sync
  useEffect(() => {
    if (!ready) {
      setReady(true);
    }
  });

  const handleOnLocationReady = () => {
    setLocationReady(true);
  };

  return (
    <FullscreenLayout {...props}>
      {ready && (
        <>
          <LocationProvider onReady={handleOnLocationReady} />
          <MapUrlProvider />
          {locationReady && <Map />}
        </>
      )}
    </FullscreenLayout>
  );
};

export default MapPage;
