import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import "../../css/form.css";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
  toggleComponent: PropTypes.func.isRequired,
};

const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const SignUp = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  toggleComponent,
  split,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");

  const outerClasses = classNames(
    "SignUp section center-content-mobile reveal-from-bottom",
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

    UserService.signup(email,password,fullname,role).then((res)=> {
      alert('Account Created sucessfully');
      handleToggle();

    },(err)=> {
      alert(err.response.data.message);
    })
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className="box">
          <h2>Sign up</h2>
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
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required=""
              />
              <label>Name</label>
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
            <div className="inputbox">
              <input
                style={{ fontSize: "14px", marginBottom: "18px" }}
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required=""
              />
              <label>Password Confirmation</label>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  marginBottom: "0px",
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Select an option:
              </p>
              <label>
                <input
                  type="radio"
                  name="option"
                  value="0"
                  checked={role === "0"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  I'm a customer
                </span>
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="option"
                  value="1"
                  checked={role === "1"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  I'm a pet walker
                </span>
              </label>
            </div>

            <Link  to="#0" onClick={handleToggle}>
              <span className="text-color-high" style={{ fontSize: "14px" }}>
                Click here to login
              </span>
            </Link>
            <Link
              onClick={handleSubmit}
              to="#0"
              style={{ marginTop: "14px" }}
              className="button button-dark button-wide-mobile button-md"
            >
              Sign up
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;

export default SignUp;
