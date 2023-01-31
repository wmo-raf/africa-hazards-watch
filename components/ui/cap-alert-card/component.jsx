import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "components/ui/button";
import Icon from "components/ui/icon";

import Dotdotdot from "react-dotdotdot";
import cx from "classnames";

import infoIcon from "assets/icons/info.svg?sprite";

import styles from "./cap-alert-card.module.scss";

const TOP_META = {
  onset: { title: "Onset Time", icon: infoIcon },
  expires: { title: "Expire Time", icon: infoIcon },
  urgency: { title: "Urgency", icon: infoIcon },
  certainty: { title: "Certainty", icon: infoIcon },
  senderName: { title: "Source", icon: infoIcon },
  eventSent: { title: "Sent", icon: infoIcon },
  sourceInfo: {
    country: {
      title: "Country",
      icon: infoIcon,
    },
    organisation: {
      title: "Source",
      icon: infoIcon,
    },
    logo: {
      icon: false,
      image: true,
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

  renderCountryInfo = (key, value) => {
    const meta = key.split(".").reduce((a, b) => a[b], TOP_META.sourceInfo);

    // if (!meta.title) {
    //   return null;
    // }

    return (
      <div key={key} className={styles["meta-item"]}>
        {meta && meta.icon && (
          <span>
            <Icon className={styles["meta-icon"]} icon={meta.icon} />
          </span>
        )}
        {meta.title && (
          <span className={styles["meta-header"]}>{meta.title} :</span>
        )}
        {meta.image && value ? (
          <img className={styles["cap-source-logo"]} src={value} />
        ) : (
          <span>{value.name ? value.name : value} </span>
        )}
      </div>
    );
  };

  renderMetaItem = (key, value) => {
    const meta = key.split(".").reduce((a, b) => a[b], TOP_META);

    if (!meta.title) {
      return null;
    }

    return (
      <div key={key} className={styles["meta-item"]}>
        {meta && meta.icon && (
          <span>
            <Icon className={styles["meta-icon"]} icon={meta.icon} />
          </span>
        )}
        {meta.title && (
          <span className={styles["meta-header"]}>{meta.title} :</span>
        )}
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

    const sourceItems =
      (sourceInfo &&
        Object.keys(sourceInfo).reduce((all, key) => {
          if (TOP_META.sourceInfo[key]) {
            all.push(this.renderCountryInfo(key, sourceInfo[key]));
          }
          return all;
        }, [])) ||
      [];

    return [...dataItems, ...sourceItems];
  };

  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { className, theme, data, active, clamp } = this.props;
    const { event, buttons, tag, tagColor, tagFontColor, alertDetail } =
      data || {};

    const description =
      alertDetail && alertDetail.info && alertDetail.info.description;

    const instruction =
      alertDetail && alertDetail.info && alertDetail.info.instruction;

    return (
      <div
        className={cx(styles["c-card"], className, theme, {
          [styles.active]: active,
        })}
      >
        {tag && tagColor && (
          <span className={styles.tag} style={{ backgroundColor: tagColor }}>
            <p style={{ color: tagFontColor && tagFontColor }}>{tag}</p>
          </span>
        )}
        <div
          className={cx(styles["body"], {
            [styles["top-padding"]]: tag && tagColor,
          })}
        >
          {this.renderMeta()}
          <div className={styles["text-content"]}>
            {event && <h3 className={styles.title}>{event}</h3>}
            {description && (
              <div className={styles.summary}>
                <Dotdotdot clamp={clamp || 3}>{description}</Dotdotdot>
              </div>
            )}

            {instruction && (
              <div className={styles.instruction}>
                <h3
                  className={styles.title}
                  style={{ backgroundColor: tagColor }}
                >
                  Instruction
                </h3>
                <div className={styles["instruction-text"]}>{instruction}</div>
              </div>
            )}
          </div>
          {buttons && (
            <div className={styles.buttons}>
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
