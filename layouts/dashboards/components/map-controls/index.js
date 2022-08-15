import { connect } from 'react-redux';

import { setMapSettings } from 'components/map/actions';

import Component from './component';
import { getMapControlsProps } from './selectors';

export default connect(getMapControlsProps, {
  setMapSettings
})(Component);
