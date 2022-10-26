import { Row, Column, Button } from "@erick-otenyo/hw-components";

import Link from "next/link";

import DashboardImage from "assets/images/aois/aoi-dashboard-small.png";
import DashboardImageLarge from "assets/images/aois/aoi-dashboard-small@2x.png";

import "./styles.scss";

const MyGfwNoAreas = () => (
  <div className="c-no-areas">
    <Row>
      <Column width={[1, 5 / 12]}>
        <img
          className="areas-image"
          srcSet={`${DashboardImageLarge} 2x, ${DashboardImage} 1x`}
          src={`${DashboardImage} 1x`}
          alt="you have no areas"
        />
      </Column>
      <Column width={[1, 1 / 2]}>
        <h4>You haven’t created any Areas of Interest yet</h4>
        <p>
          Creating an Area of Interest lets you customize and perform an
          in-depth analysis of the area, as well as receiving email
          notifications when new data is available.
        </p>
        <Link href="/map">
          <a>
            <Button className="learn-btn">Learn how</Button>
          </a>
        </Link>
      </Column>
    </Row>
  </div>
);

export default MyGfwNoAreas;
