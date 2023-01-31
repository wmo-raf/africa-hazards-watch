import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { trackEvent } from "utils/analytics";

import Icon from "components/ui/icon";
import Button from "components/ui/button";
import Checkbox from "components/ui/checkbox";
import Modal from "components/modal";

import arrowIcon from "assets/icons/arrow-down.svg?sprite";
import helpGreenIcon from "assets/icons/help-green.svg?sprite";

import styles from "./welcome.module.scss";

class ModalWelcome extends PureComponent {
  getContent() {
    const {
      setMapSettings,
      setMapPromptsSettings,
      setMainMapSettings,
      setShowMapPrompts,
      setModalWelcome,
      setMenuSettings,
      description,
      welcomeCards,
      showPrompts,
    } = this.props;
    return (
      <div className={styles["modal-welcome-content"]}>
        <Button
          className={`${styles["guide-btn"]} ${styles["tour-btn"]} ${styles.negative}`}
          theme="theme-button-clear theme-button-dashed"
          onClick={() => {
            setModalWelcome(false);
            setMapPromptsSettings({
              open: true,
              stepsKey: "mapTour",
              force: true,
            });
            trackEvent({
              category: "Map landing",
              action: "User interacts with popup",
              label: "Tour",
            });
          }}
        >
          <Icon className={styles["guide-btn-icon"]} icon={helpGreenIcon} />
          <p>
            Check out the highlights and learn what you can do with the map.
          </p>
          <Icon className={styles["arrow-icon"]} icon={arrowIcon} />
        </Button>

        <p className={styles["btn-intro"]}>
          <button
            className={styles["show-prompts-btn"]}
            onClick={() => setShowMapPrompts(!showPrompts)}
          >
            <Checkbox className={styles["prompts-checkbox"]} value={showPrompts} />
            Show me tips
          </button>
        </p>
      </div>
    );
  }

  render() {
    const { open, setModalWelcome } = this.props;
    return (
      <Modal
        open={open}
        contentLabel="Welcome map modal"
        onRequestClose={() => {
          setModalWelcome(false);
          trackEvent({
            category: "Map landing",
            action: "User interacts with popup",
            label: "Close",
          });
        }}
        title="Welcome to the Africa Hazards Watch map!"
        className={styles["c-modal-welcome"]}
      >
        {this.getContent()}
      </Modal>
    );
  }
}

ModalWelcome.propTypes = {
  open: PropTypes.bool,
  showPrompts: PropTypes.bool,
  description: PropTypes.string,
  setModalWelcome: PropTypes.func,
  setMenuSettings: PropTypes.func,
  welcomeCards: PropTypes.array,
  setMapPromptsSettings: PropTypes.func,
  setShowMapPrompts: PropTypes.func,
  setMapSettings: PropTypes.func,
  setMainMapSettings: PropTypes.func,
};

export default ModalWelcome;
