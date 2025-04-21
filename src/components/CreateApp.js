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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ff1102"
            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
          ></path>
        </svg>
      </button>
      <Create />
      <List />
    </div>
  );
}

export default CreateApp;
