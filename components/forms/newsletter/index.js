import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = ({ countryData, myHw }) => ({
  countries: countryData && countryData.countries,
  initialValues: {
    email: myHw && myHw.data && myHw.data.email
  }
});

export default connect(mapStateToProps)(Component);
