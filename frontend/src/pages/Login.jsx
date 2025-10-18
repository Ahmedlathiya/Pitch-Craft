import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom"; // Use useHistory in v5

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const history = useHistory(); // useHistory hook for v5

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      history.push("/"); // Use history.push() in v5 to navigate
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>PitchCraft — Login / Register</h2>
      <p className="small-muted">Simple email/password auth for assignment</p>
      <form onSubmit={submit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className="button-row">
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
          <button
            type="button"
            onClick={() => {
              setIsRegister((v) => !v);
            }}
          >
            {isRegister ? "Have an account? Login" : "No account? Register"}
          </button>
        </div>
      </form>
      <hr />
      <p className="small-muted">Tip: Use a test email for quick demo.</p>
    </div>
  );
}
