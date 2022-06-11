import { AuthProvider } from "context/AuthContext";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Main = () => {
  return (
    // setup routes using react-router-dom v6
    // https://reacttraining.com/react-router/web/guides/quick-start
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="me" element={<Dashboard />} />
            {/* redirect all route to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Main;
