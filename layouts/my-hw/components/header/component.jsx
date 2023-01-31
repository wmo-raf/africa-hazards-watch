import { Row, Column } from "@erick-otenyo/hw-components";

import UserProfile from "../user-profile";

import styles from "./heade.module.scss";

const MyHwHeader = () => (
  <div className={styles["c-myhw-header"]}>
    <Row>
      <Column width={[1, 1 / 2]}>
        <h1>my HW</h1>
      </Column>
      <Column width={[1, 1 / 2]}>
        <UserProfile />
      </Column>
    </Row>
  </div>
);

export default MyHwHeader;
