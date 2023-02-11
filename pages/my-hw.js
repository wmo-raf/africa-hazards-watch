import PageLayout from "wrappers/page";
import MyHw from "layouts/my-hw";

const MyHwPage = () => (
  <PageLayout
    title="my HW | Hazards Watch"
    description="Create an account or log into my HW"
    noIndex
  >
    <MyHw />
  </PageLayout>
);

export default MyHwPage;
