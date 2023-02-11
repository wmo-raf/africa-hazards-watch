import PropTypes from "prop-types";
import useRouter from "utils/router";
import { checkLoggedIn } from "services/user";

import { Header as HeaderComponent } from "@erick-otenyo/hw-components";

import eahwLogo from "assets/logos/logo.png";
import NavLink from "components/nav-link";

import config from "./config";

import "./styles.scss";

const Header = ({ setModalContactUsOpen, fullScreen, slim }) => {
  const { push, pushQuery, asPath, query } = useRouter();
  return (
    <HeaderComponent
      className="c-header"
      slim={slim}
      customLogo={eahwLogo}
      logoAlt="Hazards Watch"
      navMain={config.navMain}
      userAccount={config.userAccount}
      moreLinks={config.moreLinks}
      NavLinkComponent={({ children: headerChildren, className, ...props }) =>
        props.href ? (
          <NavLink {...props}>
            <a className={className}>{headerChildren}</a>
          </NavLink>
        ) : null
      }
      openContactUsModal={() => setModalContactUsOpen(true)}
      setQueryToUrl={(search) => push(`/search/?query=${search}`)}
      fullScreen={fullScreen}
      afterLangSelect={(lang) =>
        pushQuery({
          pathname: `${asPath?.split("?")?.[0]}`,
          query: { ...query, lang },
        })
      }
      checkLoggedIn={checkLoggedIn}
    />
  );
};

Header.propTypes = {
  setModalContactUsOpen: PropTypes.func,
  setSearchQuery: PropTypes.func,
  fullScreen: PropTypes.bool,
  href: PropTypes.string,
  slim: PropTypes.bool,
};

export default Header;
