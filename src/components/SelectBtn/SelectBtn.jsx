import React, { useState } from "react";

const SelectBtn = ({ actor, handleSelectActor }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    handleSelectActor(actor);
    setIsSelected(true);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`mx-auto ${
          isSelected ? "bg-blue-500" : "bg-green-500"
        } text-white px-6 py-2 rounded-lg`}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </div>
  );
};

export default SelectBtn;
