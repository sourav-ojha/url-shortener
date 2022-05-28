import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ linkTo, name }) => {
  return (
    <div className="p-3">
      <Link
        to={linkTo}
        className="p-2 hover:bg-indigo-300 hover:rounded-md hover:text-black "
      >
        {name}
      </Link>
    </div>
  );
};

export default Menu;
