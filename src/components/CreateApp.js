import React from "react";
import Create from "./Create";
import List from "./List";
import { useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import { PATHS } from "../router/paths";
import { Icon } from "@iconify/react";

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
        <Icon icon="material-symbols:logout" width="24" height="24" color="#ff1102" />
      </button>
      <Create />
      <List />
    </div>
  );
}

export default CreateApp;
