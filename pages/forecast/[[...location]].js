import { getLocationData } from "services/location";

import PageLayout from "wrappers/page";
import ForecastLayout from "layouts/forecast/component";

const notFoundProps = {
  error: 404,
  title: "Location Not Found | Hazards Watch",
  errorTitle: "Location Not Found",
};

const ALLOWED_TYPES = ["country", "point"];

export const getServerSideProps = async ({ req, params }) => {
  const [type] = params?.location || [];

  if (type && !ALLOWED_TYPES.includes(type)) {
    return {
      props: notFoundProps,
    };
  }

  if (type === "country") {
    return {
      props: {
        title: "Interactive Hazards Map for Country | AHW",
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
    return {
      props: notFoundProps,
    };
  }
};

const ForecastPage = (props) => {
  return (
    <PageLayout {...props} showFooter={false}>
      <ForecastLayout />
    </PageLayout>
  );
};

export default ForecastPage;
