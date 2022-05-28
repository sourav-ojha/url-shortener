import React from "react";

const Submit = ({ label, onClick }) => {
  return (
    //   submit button
    <div className="flex-1 flex justify-center items-center">
      <button
        className=" w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        onClick={onClick}
      >
        {label ? label : "Submit"}
      </button>
    </div>
  );
};

export default Submit;
