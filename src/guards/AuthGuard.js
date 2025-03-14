import { Navigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";

function AuthGuard({ children }) {
  const { isAuthenticated } = useFirebase();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} />;
  }

  return <>{children}</>;
}

export default AuthGuard;
