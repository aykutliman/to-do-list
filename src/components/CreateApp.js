import React, { useState, useEffect } from "react";
import { auth } from "../firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Create from "./Create";
import List from "./List";

function CreateApp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="CreateApp">
      {user ? (
        <>
          <Create user={user} />
          <List user={user} />
        </>
      ) : (
        <p>Lütfen giriş yapın.</p>
      )}
    </div>
  );
}

export default CreateApp;
