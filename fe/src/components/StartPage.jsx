// StartPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const StartPage = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/add-user");
  };

  const handleFindUser = () => {
    navigate("/find-user");
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="start-container"> {/* Change class name */}
      <h1 className="start-heading">Start Page</h1> {/* Change class name */}
      <p>Welcome to the Missing Person Detector!</p>
      <button className="start-button" onClick={handleAddUser}>Add a User</button> {/* Change class name */}
      <button className="start-button" onClick={handleFindUser}>Find a User</button> {/* Change class name */}
      <button className="start-button" onClick={handleExit}>Exit</button> {/* Change class name */}
    </div>
  );
};

export default StartPage;