import { useRoutes } from "react-router-dom";
import CreateApp from "../components/CreateApp";
import Login from "../components/Login";
import Root from "../components/Root";
import SignUp from "../components/SignUp";
import AuthGuard from "../guards/AuthGuard";
import { PATHS } from "./paths";

function Router() {
  return useRoutes([
    {
      path: PATHS.ROOT,
      element: <Root />,
    },
    {
      path: PATHS.LOGIN,
      element: <Login />,
    },
    {
      path: PATHS.SIGN_UP,
      element: <SignUp />,
    },
    {
      path: PATHS.CREATE_APP,
      element: (
        <AuthGuard>
          <CreateApp />
        </AuthGuard>
      ),
    },
  ]);
}

export default Router;
