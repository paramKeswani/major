import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "x" && password === "x") {
      setResult("Login successful!");
      navigate("/start");
    } else {
      setResult("Login failed. Invalid username or password.");
    }
  };

  return (
    <div className="login-container"> {/* Change class name */}
      <h2>Missing Person Detector</h2>
      <input
        type="text"
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button> {/* Change class name */}
      <div className="result"></div> {/* Change class name */}
    </div>
  );
};

export default LoginPage;
