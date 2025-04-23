// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import LoginPage from "./components/LoginPage";
import StartPage from "./components/StartPage";
import AddUserPage from "./components/AddUserPage";
import PageThree from "./components/CaptureTrain";
import PageFour from "./components/FaceRecognition";
import SignupPage from "./components/SignupPage";
import CaptureTrain from "./components/CaptureTrain";
import FaceRecognition from "./components/FaceRecognition";
import  HomePage  from "./components/HomePage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/start" element={<StartPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/capture-train" element={<CaptureTrain />} />
        <Route path="/face-recognition" element={<FaceRecognition />} />
      </Routes>
    </Router>
  );
}

export default App;
