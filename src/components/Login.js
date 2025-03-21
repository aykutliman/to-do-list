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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      navigate(PATHS.CREATE_APP);
    } catch (error) {
      console.error(error.code);
      toast.error(getErrorMessage(error.code));
    } finally {
      setSubmitting(false);
    }
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
        {({ isSubmitting }) => (
          <Form className="form">
            <ToastContainer
              className="toast-container"
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <label>Email</label>
            <Field type="email" name="email" placeholder="Enter your email" />
            <div className="error-message">
              <ErrorMessage name="email" />
            </div>

            <label>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <div className="error-message">
              <ErrorMessage name="password" />
            </div>

            <button className="loginBtn" type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Login;
