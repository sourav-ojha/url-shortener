import React from "react";

const SearchBox = ({ ...arg }) => {
  return (
    //   search box
    <div className="  relative">
      <input
        type="text"
        id="search"
        name="search"
        className="border font-semibold text-white bg-zinc-900 border-gray-500 focus:outline-none rounded-full bg-transparent focus:border-gray-400 focus:shadow-sm w-full pl-5 py-1 h-12 text-lg "
        placeholder="Search links"
        {...arg}
      />
    </div>
  );
};

export default SearchBox;
