import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link as AnchorLink } from "react-scroll";
import NavLink from "components/nav-link";

import Icon from "components/ui/icon";

import styles from "./subnav-menu.module.scss";

class SubNavMenu extends PureComponent {
  render() {
    const { links, className, theme } = this.props;

    return (
      <div
        className={`${styles["c-subnav-menu"]} ${styles["theme"]} || ""} ${
          className || ""
        }`}
      >
        <ul className={styles.buttons}>
          {links && links.length
            ? links.map((link) => {
                let LinkComponent = "";
                if (link.anchor) {
                  LinkComponent = (
                    <AnchorLink
                      className={`${styles.text} ${styles["-paragraph-5"]} ${styles["-color-8"]}`}
                      to={link.anchor}
                      spy
                      smooth
                      duration={500}
                    >
                      {link.icon && <Icon icon={link.icon} />}
                      <span>{link.label}</span>
                    </AnchorLink>
                  );
                } else if (link.onClick) {
                  LinkComponent = (
                    <button
                      className={`${styles["text -paragraph-5"]} ${
                        styles["-color-8"]
                      } ${link.active ? styles.active : ""}`}
                      onClick={() => {
                        link.onClick();
                      }}
                    >
                      {/* fix for safari 10 flex issues */}
                      <div className={styles["button-wrapper"]}>
                        {link.icon && <Icon icon={link.icon} />}
                        <span>{link.label}</span>
                      </div>
                    </button>
                  );
                } else {
                  LinkComponent = (
                    <NavLink
                      href={link.href}
                      as={link.as}
                      activeClassName="active"
                      activeShallow={link.activeShallow}
                    >
                      <a
                        className={`${styles["text -paragraph-5"]} ${
                          styles["-color-8"]
                        } ${link.active ? styles.active : ""}`}
                      >
                        {link.icon && <Icon icon={link.icon} />}
                        <span>{link.label}</span>
                      </a>
                    </NavLink>
                  );
                }
                return (
                  <li
                    key={link.label}
                    className={
                      styles[`subnav-link-${link.label.toLowerCase()}`]
                    }
                  >
                    {LinkComponent}
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    );
  }
}

SubNavMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      anchor: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  theme: PropTypes.string,
};

export default SubNavMenu;
