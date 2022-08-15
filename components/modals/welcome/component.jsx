import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from 'utils/analytics';

import Icon from 'components/ui/icon';
import Button from 'components/ui/button';
import Checkbox from 'components/ui/checkbox';
import Modal from 'components/modal';

import arrowIcon from 'assets/icons/arrow-down.svg?sprite';
import helpGreenIcon from 'assets/icons/help-green.svg?sprite';


import './styles.scss';

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
      <div className="modal-welcome-content">
        <Button
          className="guide-btn tour-btn negative"
          theme="theme-button-clear theme-button-dashed"
          onClick={() => {
            setModalWelcome(false);
            setMapPromptsSettings({
              open: true,
              stepsKey: 'mapTour',
              force: true,
            });
            trackEvent({
              category: 'Map landing',
              action: 'User interacts with popup',
              label: 'Tour',
            });
          }}
        >
          <Icon className="guide-btn-icon" icon={helpGreenIcon} />
          <p>
            Check out the highlights and learn what you can do with the map.
          </p>
          <Icon className="arrow-icon" icon={arrowIcon} />
        </Button>

        <p className="btn-intro">
          <button
            className="show-prompts-btn"
            onClick={() => setShowMapPrompts(!showPrompts)}
          >
            <Checkbox className="prompts-checkbox" value={showPrompts} />
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
            category: 'Map landing',
            action: 'User interacts with popup',
            label: 'Close',
          });
        }}
        title="Welcome to the Africa Hazards Watch map!"
        className="c-modal-welcome"
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
