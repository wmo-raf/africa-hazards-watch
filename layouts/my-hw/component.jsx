import { Fragment } from "react";
import PropTypes from "prop-types";

import { Row, Column, Loader } from "hw-components";

import ShareModal from "components/modals/share";
import LoginForm from "components/forms/login";
import AreaOfInterestModal from "components/modals/area-of-interest";

import AreasProvider from "providers/areas-provider";
import CountryDataProvider from "providers/country-data-provider";
import MyHWProvider from "providers/myhw-provider";
import LocationProvider from "providers/location-provider";

import MyHWeader from "./components/header";
import Areas from "./components/areas";

import "./styles.scss";

const MyHWPage = ({ loggedIn, loggingIn }) => (
  <div className="l-my-hw-page">
    <MyHWProvider />
    {!loggingIn && !loggedIn && (
      <Row className="login">
        <Column width={[0, 1 / 12, 1 / 6]} />
        <Column width={[1, 5 / 6, 2 / 3]}>
          <LoginForm />
        </Column>
      </Row>
    )}
    {loggingIn && (
      <Row>
        <Column>
          <Loader />
        </Column>
      </Row>
    )}
    {loggedIn && (
      <Fragment>
        <MyHWeader />
        <LocationProvider />
        <Areas />
        <AreasProvider />
        <CountryDataProvider />
        <AreaOfInterestModal canDelete />
        <ShareModal />
      </Fragment>
    )}
  </div>
);

MyHWPage.propTypes = {
  loggedIn: PropTypes.bool,
  loggingIn: PropTypes.bool,
};

export default MyHWPage;
