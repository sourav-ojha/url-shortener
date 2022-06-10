import Navbar from "components/Navbar";
import { useAuth } from "context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./style.css";
const Login = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className=" loginBlock">
      <div className="absolute loginOverlay"></div>
      <div className="  flex-1 z-10 ">
        <Navbar />
        <div className="flex h-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
