import React from "react";
import { PATHS } from "../router/paths";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(PATHS.LOGIN);
  };

  const handleSignUpClick = () => {
    navigate(PATHS.SIGN_UP);
  };

  return (
    <div className="Login">
      <h1>Welcome</h1>
      <h3>Please login or sign up</h3>
      <button className="loginBtn" onClick={handleLoginClick}>Login</button>
      <button className="signUpBtn" onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
};

export default Root;
