import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import lowerCase from "lodash/lowerCase";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { trackEvent } from "utils/analytics";

import { Button, NoContent } from "@erick-otenyo/hw-components";

import Modal from "components/modal";

import styles from "./meta.module.scss";

class ModalMeta extends PureComponent {
  static propTypes = {
    setModalMetaClosed: PropTypes.func,
    metaData: PropTypes.object,
    getModalMetaData: PropTypes.func,
    metakey: PropTypes.string,
    tableData: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    locationName: PropTypes.string,
  };

  componentDidMount() {
    const { getModalMetaData, metakey } = this.props;
    if (metakey) {
      getModalMetaData(metakey);
    }
  }

  componentDidUpdate(prevProps) {
    const { getModalMetaData, metakey, metaData } = this.props;
    if (metakey && metakey !== prevProps.metakey) {
      getModalMetaData(metakey);
    }

    if (
      metaData &&
      metaData.title &&
      metaData.title !== prevProps.metaData.title
    ) {
      trackEvent({
        category: "Open modal",
        action: "Click to open",
        label: `Metadata: ${metaData && metaData.title}`,
      });
    }
  }

  getContent() {
    const { metaData, tableData, loading, error, locationName } = this.props;
    const {
      subtitle,
      overview,
      citation,
      map_service,
      learn_more,
      download_data,
      amazon_link,
    } = metaData || {};

    const parsedCitation =
      citation &&
      citation
        .replace("[selected area name]", locationName)
        .replace("[date]", moment().format("DD/MM/YYYY"));

    return (
      <div className={styles["modal-meta-content"]}>
        {error && !loading && (
          <NoContent message="There was a problem finding this info. Please try again later." />
        )}
        {!loading && isEmpty(metaData) && !error && (
          <NoContent message="Sorry, we cannot find what you are looking for." />
        )}
        {!loading && !error && !isEmpty(metaData) && (
          <div>
            <p
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: subtitle }} // eslint-disable-line
            />
            <div className={`${styles["meta-table"]} ${styles["element-fullwidth"]}`}>
              {tableData &&
                Object.keys(tableData).map((key) =>
                  tableData[key] ? (
                    <div key={key} className={styles["table-row"]}>
                      <div
                        className={styles["title-column"]}
                        dangerouslySetInnerHTML={{ __html: lowerCase(key) }} // eslint-disable-line
                      />
                      <div className={styles["description-column"]}>
                        {this.parseContent(tableData[key])}
                      </div>
                    </div>
                  ) : null
                )}
            </div>
            {overview && (
              <div className={styles.overview}>
                <h4>Overview</h4>
                <div className={styles.body}>{this.parseContent(overview)}</div>
              </div>
            )}
            {parsedCitation && (
              <div className={styles.citation}>
                <h5>Citation</h5>
                <div className={styles.body}>{this.parseContent(parsedCitation)}</div>
              </div>
            )}
            {(learn_more || download_data || map_service || amazon_link) && (
              <div className={styles["ext-actions"]}>
                {learn_more && (
                  <a
                    href={learn_more}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="medium">LEARN MORE</Button>
                  </a>
                )}
                {download_data && (
                  <a
                    href={download_data}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="medium">DOWNLOAD DATA</Button>
                  </a>
                )}
                {(map_service || amazon_link) && (
                  <a
                    href={map_service || amazon_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="medium">OPEN IN ARCGIS</Button>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  parseContent = (html) => {
    return (
      <div>
        {ReactHtmlParser(html, {
          transform: (node) =>
            node.name === "a" ? (
              <a
                key={node.attribs.href}
                href={node.attribs.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {node.children[0].data}
              </a>
            ) : (
              ""
            ),
        })}
      </div>
    );
  };

  render() {
    const { metakey, setModalMetaClosed, metaData, loading } = this.props;
    const { title } = metaData || {};

    return (
      <Modal
        open={!!metakey}
        onRequestClose={() => setModalMetaClosed()}
        className={styles["c-modal-meta"]}
        title={title}
        loading={loading}
      >
        {this.getContent()}
      </Modal>
    );
  }
}

export default ModalMeta;
