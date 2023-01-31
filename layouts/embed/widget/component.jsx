import PropTypes from "prop-types";
import cx from "classnames";

import CountryDataProvider from "providers/country-data-provider";
import GeodescriberProvider from "providers/geodescriber-provider";
import GeostoreProvider from "providers/geostore-provider";
import AreasProvider from "providers/areas-provider";
import LocationProvider from "providers/location-provider";

import Widgets from "components/widgets";
import Share from "components/modals/share";
import ModalMeta from "components/modals/meta";

import styles from "./widget.module.scss";

const WidgetEmbedPage = ({ widget, trase }) => (
  <div
    className={cx(styles["l-embed-widget-page"], { [styles["-trase"]]: trase })}
  >
    <Widgets className={styles["embed-widget"]} embed widget={widget} />
    <Share />
    <ModalMeta />
    <CountryDataProvider />
    <GeodescriberProvider embed />
    <AreasProvider />
    <GeostoreProvider />
    <LocationProvider />
  </div>
);

WidgetEmbedPage.propTypes = {
  widget: PropTypes.string,
  trase: PropTypes.bool,
};

export default WidgetEmbedPage;
