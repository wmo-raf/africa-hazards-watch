import PropTypes from "prop-types";

import { Row, Column, Loader } from "@erick-otenyo/hw-components";

import AreasTable from "../areas-table";
import NoAreas from "../no-areas";

import styles from "./areas.module.scss";

const MyHwAreas = ({ hasAreas, loading }) => (
  <div className={styles["c-myhw-areas"]}>
    {loading && <Loader className={styles["myhw-loader"]} />}
    {!loading && hasAreas && (
      <Row>
        <Column>
          <AreasTable />
        </Column>
      </Row>
    )}
    {!loading && !hasAreas && <NoAreas />}
  </div>
);

MyHwAreas.propTypes = {
  hasAreas: PropTypes.bool,
  loading: PropTypes.bool,
};

export default MyHwAreas;
