import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom"; // Use useHistory in v5

export default function Dashboard() {
  const history = useHistory(); // useHistory hook for v5

  const handleLogout = async () => {
    await signOut(auth);
    history.push("/login"); // Use history.push() to navigate
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p className="small-muted">
        Welcome to PitchCraft. Create a new pitch or view previous ones (saved
        to Firestore).
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={() => history.push("/create")}>Create Pitch</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />
      <p className="small-muted">
        Saved pitches will appear in Firestore (collection:{" "}
        <strong>pitches</strong>).
      </p>
    </div>
  );
}
