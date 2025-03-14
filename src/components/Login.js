import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";
import { getErrorMessage, validationSchema } from "./LoginInfo";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { login, register } = useFirebase();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate(PATHS.CREATE_APP);
    } catch (error) {
      // console.error(error);
      console.log(error.code);
      alert(getErrorMessage(error.code));
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await register(email, password);
      navigate(PATHS.CREATE_APP);
    } catch (error) {
      console.error(error);
      alert(getErrorMessage(error.code));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await handleLogin(values.email, values.password);
    setSubmitting(false);
  };

  const handleSignUpClick = async (values) => {
    await handleSignUp(values.email, values.password);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="Login">
          <label>Email</label>
          <Field type="email" name="email" placeholder="Enter your email" />
          <label>Password</label>
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button className="loginBtn" type="submit">
            Login
          </button>
          <button
            className="signUpBtn"
            type="button"
            onClick={() => handleSignUpClick(values)}
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
