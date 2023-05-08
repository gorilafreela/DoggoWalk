import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useHistory } from 'react-router-dom';
import { SectionProps } from "../../utils/SectionProps";
import "../../css/form.css";
import { Link } from 'react-router-dom';
import UserService from "../../services/UserService";
import LocalStorageService from "../../services/LocalStorageService";
const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
  toggleComponent: PropTypes.func.isRequired,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const Login = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  toggleComponent,
  ...props
}) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const outerClasses = classNames(
    "Login section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  

  const handleToggle = () => {
    toggleComponent();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login(email,password).then((res)=> {
      delete res.data.password;
      LocalStorageService.setSessionData(res.data);
      LocalStorageService.setToken(res.data.token);
      alert('Logged in successfully');
      if(res.data.role) {
        if(!res.data.compled) {
          history.push('/complete-profile');
          window.location.reload();
          return;
        }
        history.push('/mobile');
        window.location.reload();
      } else {
        history.push('/desktop');
        window.location.reload();
      }
      
    },(err)=> {
      alert(err.response.data.message);
    })
  };

  return (
    <section {...props} className={outerClasses}>
      <div  className="container">

          <div className="box">
            <h2>Sign in</h2>
            <form className="default-form">
            <div className="inputbox">
              <input
                style={{ fontSize: "14px", marginBottom: "24px" }}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required=""
              />
              <label>E-mail</label>
            </div>
              <div className="inputbox">
              <input
                style={{ fontSize: "14px", marginBottom: "24px" }}
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
              <label>Password</label>
            </div>

              <div>
                <Link to="#"  onClick={handleToggle}>
                  <span className="text-color-high"  style={{ fontSize: "14px" }}>
                    Create a new account
                  </span>
                </Link>
              </div>
              
              <Link to="#" onClick={handleSubmit} style={{ marginTop: "14px" }} className="button button-dark button-wide-mobile button-md">
                Login
              </Link>
            </form>
          </div>
   
      </div>
    </section>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
