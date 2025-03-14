import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/email-already-in-use":
      return "This email address is already in use";
    case "auth/invalid-credential":
      return "Wrong password or unregistered email.";
    default:
      return "An error occurred. Please try again.";
  }
};
