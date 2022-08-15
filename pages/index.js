import PageLayout from "wrappers/page";
import SeoSearchBox from "wrappers/seo/searchBox";

import Home from "layouts/home";

const HomePage = (props) => (
  <PageLayout
    title="Hazards monitoring in Africa | Africa Hazards Watch"
    description="Africa Hazards Watch offers data, technology and tools for monitoring hazards in Africa"
  >
    <SeoSearchBox
      title="Hazards monitoring in Africa | Africa Hazards Watch"
      description="Africa Hazards Watch offers data, technology and tools for monitoring hazards in Africa"
    />
    <Home {...props} />
  </PageLayout>
);

export default HomePage;
