import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFirebase from "../hooks/useFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ff1102"
                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                ></path>
              </svg>
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
