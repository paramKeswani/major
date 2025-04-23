// SignupPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    axios
      .post("http://localhost:5000/signup", { username, password })
      .then((response) => {
        setResult(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        setResult(error.response.data.error);
      });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        className="signup-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="signup-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="signup-button" onClick={handleSignup}>Sign Up</button>
      <div className="result">{result}</div>
    </div>
  );
};

export default SignupPage;
