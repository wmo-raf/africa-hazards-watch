import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import cx from "classnames";
import ContentLoader from "react-content-loader";
import { translateText } from "utils/lang";

import applicationsMeta from "data/applications.json";

import { formatNumber } from "utils/format";

import Icon from "components/ui/icon";
import MapGeostore from "components/map-geostore";

import tagIcon from "assets/icons/tag.svg?sprite";
import subscribedIcon from "assets/icons/subscribed.svg?sprite";
import warningIcon from "assets/icons/warning.svg?sprite";

import "./styles.scss";

class AoICard extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    tags: PropTypes.array,
    application: PropTypes.string,
    createdAt: PropTypes.string,
    simple: PropTypes.bool,
    location: PropTypes.object,
    status: PropTypes.string,
    setConfirmSubscriptionModalSettings: PropTypes.func,
    confirmed: PropTypes.bool,
    id: PropTypes.string,
  };

  state = {
    alerts: {},
    loading: false,
  };

  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      tags,
      name,
      application,
      createdAt,
      simple,
      location,
      status,
    } = this.props;

    const applicationName = applicationsMeta[application];
    const createdMetaTemplate = translateText(
      `Created {date} ${
        application !== "hw" && applicationName
          ? ` on ${applicationName}`
          : ""
      }`
    );
    const createdMeta = createdMetaTemplate.replace(
      "{date}",
      moment(createdAt).format("MMM DD YYYY")
    );

    return (
      <div className={cx("c-aoi-card", { simple })}>
        <MapGeostore
          className="aoi-card-map"
          location={location}
          padding={simple ? 15 : 25}
          cursor="pointer"
          small={simple}
        />
        <div className="item-body">
          <h5 className="title">{name}</h5>
          {!simple && (
            <span className="created notranslate">{createdMeta}</span>
          )}
          {tags && tags.length > 0 && (
            <div className="tags">
              <Icon icon={tagIcon} className="tag-icon" />
              <p>{tags.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AoICard;
