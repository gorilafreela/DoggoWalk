import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from 'react-scroll';
import Image from "../elements/Image";
import { useHistory } from "react-router-dom";
import LocalStorageService from "../../services/LocalStorageService";
const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const history = useHistory();
  const [isActive, setIsactive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {}, [isLoggedIn]);
  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const logout = () => {
    LocalStorageService.killSession();
    history.push("/");
    window.location.reload();
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  return (
    <header {...props} className={classes}>
      <div className="container">
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Image
            src={require("./../../assets/images/logo.png")}
            alt="Features tile icon 02"
            width={64}
            height={64}
          />

          <h3
            className="mt-0 mb-0 is-loaded text-color-primary"
            data-reveal-delay="200"
          >
            DoggoWalk
          </h3>

          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                {!hideNav && (
                  <>
                    <div className="header-nav-inner">
                      <ul
                        className={classNames(
                          "list-reset text-xs",
                          navPosition && `header-nav-${navPosition}`
                        )}
                      >
                        {isLoggedIn ? (
                           <li>
                           <button
                             style={{
                               marginLeft: "18px",
                             }}
                             onClick={logout}
                             className="button button-dark button-wide-mobile button-sm"
                           >
                             Logout
                           </button>
                         </li>
                        ) : (
                          <li>
                            <Link
                              className="button button-white button-wide-mobile button-sm"
                              to="login"
                              smooth={true}
                              offset={-70}
                              duration={500}
                            >
                              Login
                            </Link>
                          </li>
                        )}
                      </ul>
                  
                    </div>
                  </>
                )}
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
