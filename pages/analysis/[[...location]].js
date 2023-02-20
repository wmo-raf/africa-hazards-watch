import PageLayout from "wrappers/page";
import AnalysisPageLayout from "layouts/analysis";

const AnalysisPage = (props) => {
  return (
    <PageLayout {...props} showFooter={false}>
      <AnalysisPageLayout />
    </PageLayout>
  );
};

export default AnalysisPage;
