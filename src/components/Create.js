import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFirebase from "../hooks/useFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

function Create() {
  const { add } = useFirebase();

  const initialValues = {
    task: "",
  };

  const validationSchema = Yup.object({
    task: Yup.string()
      .trim()
      .min(3, "Task must be at least 3 characters")
      .required("Please enter a task!"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await add("tasks", {
        task: values.task,
        completed: false,
        createdAt: new Date(),
      });

      resetForm();
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
      console.error("Task creation error:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <label>Create New Task</label>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="task" placeholder="Enter your task." />
            <div className="error-message">
              <ErrorMessage name="task" />
            </div>
            <button type="submit" className="createBtn" disabled={isSubmitting}>
              <Icon icon="mdi:plus" width="24" height="24" color="#ff1102" />
            </button>
          </Form>
        )}
      </Formik>
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
    </>
  );
}

export default Create;
