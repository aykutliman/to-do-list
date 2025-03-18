import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";
import { getErrorMessage, validationSchema } from "./LoginInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { login } = useFirebase();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate(PATHS.CREATE_APP);
    } catch (error) {
      console.log(error.code);
      toast.error(getErrorMessage(error.code));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await handleLogin(values.email, values.password);
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
          <Form className="Login">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ marginTop: "110px" }}
            />
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
            <button className="loginBtn" type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
