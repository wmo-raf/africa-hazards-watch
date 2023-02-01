import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = ({ myHw }) => ({
  initialValues: {
    email: myHw && myHw.data && myHw.data.email
  }
});

export default connect(mapStateToProps)(Component);
