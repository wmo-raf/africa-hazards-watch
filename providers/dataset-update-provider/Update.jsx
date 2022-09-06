import { PureComponent } from "react";
import { connect } from "react-redux";

import { getDatasetUpdateProps } from "./selectors";
import { setMapSettings } from "components/map/actions";
import * as ownActions from "./actions";

const actions = {
  ...ownActions,
  setMapSettings,
};

class LayerUpdateProvider extends PureComponent {
  componentDidMount() {
    const { updateInterval } = this.props;

    this.doUpdate({ isInitial: true });

    this.interval = setInterval(
      () => this.doUpdate({}),
      updateInterval || 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  doUpdate = ({ isInitial }) => {
    const {
      layer,
      getTimestamps,
      getData,
      setMapSettings,
      setTimestamps,
      setGeojsonData,
      activeDatasets,
      setLayerUpdatingStatus,
      setLayerLoadingStatus,
    } = this.props;

    // update timestamps
    if (getTimestamps) {
      console.log(`Updating layer : ${layer}, fetching latest timestamps`);

      setLayerUpdatingStatus({ [layer]: true });

      if (isInitial) {
        setLayerLoadingStatus({ [layer]: true });
      }

      getTimestamps()
        .then((timestamps) => {
          setTimestamps({ [layer]: timestamps });

          const newParam = { time: timestamps[timestamps.length - 1] };

          setMapSettings({
            datasets: activeDatasets.map((l) => {
              const dataset = { ...l };
              if (l.layers.includes(layer)) {
                dataset.params = {
                  ...dataset.params,
                  ...newParam,
                };
              }
              return dataset;
            }),
          });

          setLayerUpdatingStatus({ [layer]: false });

          if (isInitial) {
            setLayerLoadingStatus({ [layer]: false });
          }
        })
        .catch((err) => {
          setLayerUpdatingStatus({ [layer]: false });

          setLayerLoadingStatus({ [layer]: false });
        });
    }

    // update data
    if (getData) {
      console.log(`Updating layer : ${layer}, fetching latest data`);

      setLayerUpdatingStatus({ [layer]: true });

      if (isInitial) {
        setLayerLoadingStatus({ [layer]: true });
      }

      getData()
        .then((data) => {
          if (data) {
            setGeojsonData({ [layer]: data });
            setLayerUpdatingStatus({ [layer]: false });

            if (isInitial) {
              setLayerLoadingStatus({ [layer]: false });
            }
          }
        })
        .catch((err) => {
          setLayerUpdatingStatus({ [layer]: false });
          setLayerLoadingStatus({ [layer]: false });
        });
    }
  };

  render() {
    return null;
  }
}

export default connect(getDatasetUpdateProps, actions)(LayerUpdateProvider);
