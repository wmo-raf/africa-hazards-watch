import PageLayout from "wrappers/page";

import Value from "layouts/value";

const ValuePage = (props) => (
  <PageLayout
    title="Hazards monitoring in Africa | Hazards Watch"
    description="Hazards Watch offers data, technology and tools for monitoring hazards in Africa"
  >
    <Value {...props} />
  </PageLayout>
);

export default ValuePage;
