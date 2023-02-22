import PageLayout from "wrappers/page";
import CapAnalysisPageLayout from "layouts/cap-analysis";

import CapUrlProvider from "providers/cap-url-provider";

const CapAnalysisPage = (props) => {
  return (
    <PageLayout {...props} showFooter={false}>
      <CapAnalysisPageLayout />
    </PageLayout>
  );
};

export default CapAnalysisPage;
