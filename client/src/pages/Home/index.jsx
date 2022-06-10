import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto grid-rows-1 ">
      <div className="w-full text-center">Home</div>
      <div className="w-full text-center">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
