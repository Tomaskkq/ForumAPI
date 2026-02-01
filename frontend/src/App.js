import './App.css';
import { useState } from "react";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <Posts />
      )}
    </div>
  );
}

export default App;