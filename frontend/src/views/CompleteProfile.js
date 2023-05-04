import React, { useState, useRef,useEffect  } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionProps } from "../utils/SectionProps";
import { useHistory } from "react-router-dom";
import "../css/form.css";
import UserService from "../services/UserService";
import LocalStorageService from "../services/LocalStorageService";
const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool,
};


const defaultProps = {
  ...SectionProps.defaults,
  split: false,
};

const CompleteProfile = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [fileName, setFileName] = useState("");
  const outerClasses = classNames(
    "CompleteProfile section center-content-mobile reveal-from-bottom",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );
  const inputFileRef = useRef(null);
  const handleFileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0]
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileName(file.name);
      setPicture(reader.result);
      console.log(reader.result);
    };
  };

  useEffect(() => {
    const getDetails = () => {
      UserService.getDetails().then(
        (res) => {
          delete res.data.password;
          if (res.data.com) LocalStorageService.setSessionData(res.data);
          if (res.data.completed) {
            alert("You have already completed your profile");
            history.push("/mobile");
          }
        },
        (err) => {
          alert(err.response.data.message);
        }
      );
    };
    getDetails();
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();

    UserService.completeProfile(description, parseInt(price), picture).then(
      (res) => {
        delete res.data.password;
        LocalStorageService.setSessionData(res.data);
        LocalStorageService.setToken(res.data.token);
        alert("Professional profile updated");
        history.push('/mobile');
      },
      (err) => {
        alert(err.response.data.message);
      }
    );
  };

  return (
    <section  className={outerClasses}>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="box">
          <h3 style={{ marginBottom: "32px", marginTop: "0px" }}>
            Complete your professional profile
          </h3>
          <form className="default-form">
            <div className="inputbox">
              <input
                style={{ fontSize: "14px", marginBottom: "24px" }}
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required=""
              />
              <label>Short description</label>
            </div>

            <div className="inputbox">
              <input
                style={{ fontSize: "14px", marginBottom: "24px" }}
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required=""
              />
              <label>Price per hour</label>
            </div>

            <div style={{}}>
              <label
                style={{
                  fontSize: "12px",
                  marginBottom: "24px",
                  color: "#fff",
                }}
              >
                Photo
              </label>
              <input
                style={{
                  color: "#fff",
                  fontSize: "11px",
                  marginBottom: "24px",
                }}
                hidden
                ref={inputFileRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                required=""
              />


              <button
                type="button"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  fontSize: "14px",
                  marginBottom: "24px",
                  height: "60px",
                  borderRadius: "16px",
                  backgroundColor: "#7e80ff",
                  border: "1px dashed white",
                  transition: "background-color 0.3s, border-color 0.3s",
                  color: "#fff"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1D1F23";
                 
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#7e80ff";
                
                }}
                onClick={() => {
                  inputFileRef.current.click();
                }}
                
              >
             {fileName ? fileName : "Click here to upload a picture"}
              </button>
            </div>

            <button
              onClick={handleSubmit}
              style={{ marginTop: "14px" }}
              className="button button-dark button-wide-mobile button-md"
            >
              Complete registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

CompleteProfile.propTypes = propTypes;
CompleteProfile.defaultProps = defaultProps;

export default CompleteProfile;
