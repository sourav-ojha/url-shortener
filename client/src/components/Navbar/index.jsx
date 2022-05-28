import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="flex  items-center pl-10 text-white ">
      <div className="flex-1 flex  items-center gap-2 ">
        <Link
          to="/"
          className="flex  text-white text-2xl font-bold p-5 hover:text-indigo-300  "
        >
          Shtly
        </Link>
        <Menu linkTo="/" name="Home" />
        <Menu linkTo="/login" name="Login" />
      </div>
      <div className="flex  items-center justify-center ">
        <div className="flex justify-center text-white font-bold  ">
          <Menu linkTo="/me" name="Me" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
