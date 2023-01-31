import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";

import Icon from "components/ui/icon";

import closeIcon from "assets/icons/close.svg";

import styles from "./download-data.module.scss";

class DownloadData extends PureComponent {
  renderDownloadLinks = (downloads) => (
    <Fragment key={downloads.label}>
      <span>{downloads.label}</span>
      <ul className={styles["download-list"]}>
        {downloads.urls.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </Fragment>
  );

  render() {
    const { onClose, downloadUrls } = this.props;

    return (
      <div className={styles["c-download-data"]}>
        <h4 className={styles.title}>Download Analysis Data</h4>
        <button onClick={onClose}>
          <Icon className={styles["icon-close"]} icon={closeIcon} />
        </button>
        {downloadUrls &&
          !!downloadUrls.length &&
          downloadUrls.map((d) => this.renderDownloadLinks(d))}
        <p className={styles.terms}>
          By downloading data you agree to the{" "}
          <a href="/terms" target="_blank">
            AHW Terms of Service
          </a>
        </p>
      </div>
    );
  }
}

DownloadData.propTypes = {
  onClose: PropTypes.func,
  downloadUrls: PropTypes.array,
};

export default DownloadData;
