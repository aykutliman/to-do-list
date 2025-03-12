import { useNavigate } from "react-router-dom";
import React from "react";
import { Formik, Form, Field } from "formik";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { validationSchema, getErrorMessage } from "./LoginInfo";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Giriş başarılı:", user);
      navigate("/create-app");
    } catch (error) {
      console.error("Giriş hatası:", error.message);
      alert(getErrorMessage(error.code));
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Kullanıcı oluşturuldu ve giriş yapıldı:", user);
      navigate("/create-app");
    } catch (error) {
      console.error("Kayıt hatası:", error.message);
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
      {({ errors, touched, submitCount, values }) => (
        <Form className="Login">
          <label>Email</label>
          <Field type="email" name="email" placeholder="Email giriniz." />
          {submitCount > 0 && errors.email && touched.email ? (
            <span className="error-message">{errors.email}</span>
          ) : (
            <span className="error-message"></span>
          )}

          <label>Parola</label>
          <Field
            type="password"
            name="password"
            placeholder="Parolanızı giriniz."
          />
          {submitCount > 0 && errors.password && touched.password ? (
            <span className="error-message">{errors.password}</span>
          ) : (
            <span className="error-message"></span>
          )}

          <button className="loginBtn" type="submit">Giriş Yap</button>
          <button className="signUpBtn" type="button" onClick={() => handleSignUpClick(values)}>
            Kaydol
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
