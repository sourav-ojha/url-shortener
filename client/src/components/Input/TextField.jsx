import React from "react";
import "./style.css";
const TextField = ({ name, label, ...rest }) => {
  return (
    <>
      <div class="floating-input mb-5 relative">
        <input
          type="text"
          id={name}
          name={name}
          className="border font-semibold text-white bg-zinc-900 border-gray-500 focus:outline-none rounded-lg focus:border-gray-400 focus:shadow-sm w-full pl-5 py-3 h-16 text-lg "
          placeholder="random"
          {...rest}
        />
        <label
          for={name}
          className="absolute top-0 left-0 px-5 py-5 text-gray-100 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default TextField;
