import PageLayout from "wrappers/page";
import ClimateChange from "layouts/topics/climate-change";
import { getLocationData } from "services/location";

const notFoundProps = {
  error: 404,
  title: "Location Not Found | Africa Hazards Watch",
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
        title: "Climate Change Analysis for Country | AHW",
      },
    };
  }
  if (type === "point") {
    return {
      props: {
        title: "Climate Change Analysis for Point | AHW",
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

const ClimateChangePage = (props) => {
  return (
    <PageLayout {...props} showFooter={false}>
      <ClimateChange />
    </PageLayout>
  );
};

export default ClimateChangePage;
