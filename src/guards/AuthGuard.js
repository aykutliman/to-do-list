import { Navigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";

function AuthGuard({ children }) {
  const { isAuthenticated } = useFirebase();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated && !savedUser) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return <>{children}</>;
}

export default AuthGuard;
