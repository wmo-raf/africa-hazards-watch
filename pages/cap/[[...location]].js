import PageLayout from "wrappers/page";
import CapAnalysisPageLayout from "layouts/cap-analysis";

import LocationProvider from "providers/location-provider";

const CapAnalysisPage = (props) => {
  return (
    <PageLayout {...props} showFooter={false}>
      <LocationProvider />
      <CapAnalysisPageLayout />
    </PageLayout>
  );
};

export default CapAnalysisPage;
