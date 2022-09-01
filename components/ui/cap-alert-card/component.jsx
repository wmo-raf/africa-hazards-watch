import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "components/ui/button";
import Icon from "components/ui/icon";
import isEmpty from "lodash/isEmpty";

import Dotdotdot from "react-dotdotdot";
import cx from "classnames";

import infoIcon from "assets/icons/info.svg?sprite";

import "./styles.scss";
import "./themes/card-small.scss";
import "./themes/card-dark.scss";

const TOP_META = {
  onset: { title: "Onset Time", icon: infoIcon },
  expires: { title: "Expire Time", icon: infoIcon },
  urgency: { title: "Urgency", icon: infoIcon },
  certainty: { title: "Certainty", icon: infoIcon },
  senderName: { title: "Source", icon: infoIcon },
  eventSent: { title: "Sent", icon: infoIcon },
  sourceInfo: {
    country: {
      title: "country",
    },
    organisation: {
      title: "Organisation",
    },
  },
};

class CapAlertCard extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    tag: PropTypes.string,
    tagColor: PropTypes.string,
    clamp: PropTypes.number,
  };

  renderMetaItem = (key, value) => {
    const meta = key.split(".").reduce((a, b) => a[b], TOP_META);

    if (!meta.title) {
      return null;
    }

    return (
      <div key={key} className="meta-item">
        {meta && meta.icon && (
          <span>
            <Icon className="meta-icon" icon={meta.icon} />
          </span>
        )}
        <span className="meta-header">{meta.title} :</span>
        <span>{value.name ? value.name : value} </span>
      </div>
    );
  };

  renderMeta = () => {
    const { data } = this.props;

    const dataItems = Object.keys(data).reduce((all, key) => {
      if (TOP_META[key]) {
        all.push(this.renderMetaItem(key, data[key]));
      }
      return all;
    }, []);

    const sourceInfo = data.sourceInfo;

    console.log(typeof sourceInfo);

    // const source = data.sourceInfo
    //   ? [this.renderMetaItem("sourceInfo.country", data.sourceInfo.country)]
    //   : [];

    return [...dataItems];
  };

  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { className, theme, data, active, clamp } = this.props;
    const {
      image,
      event,
      description,
      buttons,
      tag,
      tagColor,
      tagFontColor,
      sourceInfo,
    } = data || {};

    return (
      <div className={cx("c-card", className, theme, { active })}>
        {tag && tagColor && (
          <span className="tag" style={{ backgroundColor: tagColor }}>
            <p style={{ color: tagFontColor && tagFontColor }}>{tag}</p>
          </span>
        )}
        <div className={cx("body", { "top-padding": tag && tagColor })}>
          {this.renderMeta()}
          <div className="text-content">
            {event && <h3 className="title">{event}</h3>}
            {description && (
              <div className="summary">
                <Dotdotdot clamp={clamp || 3}>{description}</Dotdotdot>
              </div>
            )}
          </div>
          {buttons && (
            <div className="buttons">
              {buttons.map((button, i) => {
                if (button.link) {
                  return (
                    <Button
                      key={button.link}
                      theme="theme-button-light"
                      {...button}
                    >
                      {button.text}
                    </Button>
                  );
                }

                if (button.extLink) {
                  return (
                    <Button
                      theme="theme-button-light"
                      key={button.extLink}
                      {...button}
                    >
                      {button.text}
                    </Button>
                  );
                }

                return (
                  <Button
                    key={`${button.text}-${i}`}
                    theme="theme-button-light"
                    {...button}
                  >
                    {button.text}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CapAlertCard;
