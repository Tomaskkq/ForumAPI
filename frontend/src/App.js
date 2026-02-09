import "./App.css";
import { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const logout = () => {
      localStorage.clear();
      setToken(null);
      setUsername(null);
  };

  useEffect(() => {
    if (token) {
      setUsername(localStorage.getItem("username"));
    }
  }, [token]);

  return (
    <div>
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <>
            <button onClick={logout}>Logout</button>
            <Posts username={username} />
        </>
      )}
    </div>
  );
}

export default App;