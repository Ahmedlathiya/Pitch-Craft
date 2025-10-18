import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom"; // Use Redirect in v5

export default function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecked(true);
    });
    return unsub;
  }, []);

  if (!checked)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  
  if (!user) return <Redirect to="/login" />;  // Use Redirect instead of Navigate in v5

  return children;
}
