import React from "react";

const SideBoxRow = ({ item, selectedLink, setSelectedLink }) => {
  const handleClick = () => {
    setSelectedLink(item);
  };
  return (
    <div
      className="flex border-lime-100 border-2 h-16 items-center justify-between hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className=" flex p-2 w-full">
        <div className={selectedLink === item && "text-lime-400"}>
          Links {item}{" "}
        </div>
      </div>
    </div>
  );
};

export default SideBoxRow;
