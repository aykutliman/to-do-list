import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";
import { getErrorMessage, validationSchema } from "./LoginInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { register } = useFirebase();
  const navigate = useNavigate();

  const handleSignUp = async (email, password) => {
    try {
      await register(email, password);
      navigate(PATHS.CREATE_APP);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error.code));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await handleSignUp(values.email, values.password);
    setSubmitting(true);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, errors, touched }) => (
          //bunun classnamesi Login
          <Form className="Login">
            <label>Email</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
            <label>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
            <button className="signUpBtn" type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

export default SignUp;