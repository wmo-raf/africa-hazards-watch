import PropTypes from "prop-types";

import { Row, Column, Loader } from "hw-components";

import AreasTable from "../areas-table";
import NoAreas from "../no-areas";

import "./styles.scss";

const MyHwAreas = ({ hasAreas, loading }) => (
  <div className="c-myhw-areas">
    {loading && <Loader className="myhw-loader" />}
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
