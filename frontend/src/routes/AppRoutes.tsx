import React, { Profiler } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Join from "../pages/Join";
import Profile from "../pages/Profile";
import Chat from "../pages/chat";


const AppRoutes: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/chat/:purpose/:room" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
