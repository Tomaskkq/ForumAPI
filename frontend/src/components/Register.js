import { useState } from "react";
import API from "../api/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/api/register/", { username, password })
      .then((res) => {
        alert("User registered.");
        setUsername("");
        setPassword("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;