import React from "react";
import Create from "./Create";
import List from "./List";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";

function CreateApp() {
  const navigate = useNavigate();
  const { logout } = useFirebase();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(PATHS.ROOT);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="createApp">
      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
      <Create />
      <List />
    </div>
  );
}

export default CreateApp;
