import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Login from "../components/sections/Login";
import SignUp from "../components/sections/SignUp";

const Home = () => {
  const history = useHistory();
  const [activeComponent, setActiveComponent] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/desktop");
    }
  }, [history]);

  const toggleComponent = () => {
    setActiveComponent((prevComponent) =>
      prevComponent === "signup" ? "login" : "signup"
    );
  };

  return (
    <>
      <Hero
        className="illustration-section-01"
        onSignUpButtonClick={toggleComponent}
      />
      <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      />
      <FeaturesTiles />
      <Testimonial topDivider />
      {activeComponent === "login" ? (
        <Login id="login" toggleComponent={toggleComponent} split />
      ) : (
        <SignUp id="signup" toggleComponent={toggleComponent} split />
      )}
    </>
  );
};

export default Home;
