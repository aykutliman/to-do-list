import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import CreateApp from "../components/CreateApp";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-app" element={<CreateApp />} />
    </Routes>
  );
}

export default AppRoutes;
