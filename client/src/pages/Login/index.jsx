import Navbar from "components/Navbar";
import React from "react";
import LoginForm from "./LoginForm";
import "./style.css";
const Login = () => {
  return (
    <div className=" loginBlock">
      <div className="absolute loginOverlay"></div>
      <div className=" container flex-1 z-10 ">
        <Navbar />
        <div className="flex h-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
