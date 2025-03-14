import { useRoutes } from "react-router-dom";
import CreateApp from "../components/CreateApp";
import Login from "../components/Login";
import AuthGuard from "../guards/AuthGuard";
import { PATHS } from "./paths";

function Router() {
  return useRoutes([
    {
      path: PATHS.LOGIN,
      element: <Login />,
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
