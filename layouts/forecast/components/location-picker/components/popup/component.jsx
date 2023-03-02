import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import React, { Component } from "react";
import { Popup as MapPopup } from "react-map-gl";
import { translateText } from "utils/lang";
import BoundarySentence from "components/map/components/popup/components/boundary-sentence/component";
import PointSentence from "components/map/components/popup/components/point-sentence";

import "./styles.scss";

class Popup extends Component {
  renderPopupBody = () => {
    const { onClickAction, isPointType, latitude, longitude } = this.props;
    const boundarySentence = this.getBoundarySentence();
    
    return (
      <div className="location-popup-body">
        {isPointType && latitude && longitude ? (
          <PointSentence
            lat={latitude}
            lon={longitude}
            onAnalyze={onClickAction}
            actionLabel="Select"
            small
          />
        ) : (
          <>
            {boundarySentence && (
              <BoundarySentence
                onAnalyze={onClickAction}
                sentence={boundarySentence}
                actionLabel="Select"
                small
              />
            )}
          </>
        )}
      </div>
    );
  };

  getBoundarySentence = () => {
    const { boundaryFeature } = this.props;

    if (isEmpty(boundaryFeature)) {
      return null;
    }

    const data = boundaryFeature.properties;

    const { level, gid_0, name_1, name_0 } = data;
    let name = data[`name_${level || "0"}`];
    if (!gid_0) {
      name = data[Object.keys(data).find((k) => k.includes("name"))];
    }
    const locationNameTranslated = translateText(name);

    let locationNames = [locationNameTranslated];

    if (level === 2) {
      locationNames = [
        locationNameTranslated,
        translateText(name_1),
        translateText(name_0),
      ];
    } else if (level === 1) {
      locationNames = [locationNameTranslated, translateText(name_0)];
    }

    const locationName = locationNames.join(", ");

    const params = {
      location: locationName,
    };

    const sentence = translateText("{location}");

    return {
      sentence,
      params,
    };
  };

  render() {
    const { latitude, longitude, onClose, showPopup } = this.props;

    if (!showPopup) {
      return null;
    }

    return (
      <MapPopup
        latitude={latitude}
        longitude={longitude}
        onClose={onClose}
        closeOnClick={false}
      >
        <div className="c-popup">{this.renderPopupBody()}</div>
      </MapPopup>
    );
  }
}

export default Popup;
