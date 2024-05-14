import React, { useState } from "react";
import list from "../list.json";
import "../App.css";

interface DropdownProps {
  handleNameSelection: (name: string) => void;
}

function Dropdown({ handleNameSelection }: DropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNameClick = (name:any) => {
    setSelectedName(name);
    handleNameSelection(name);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      setShowDropdown(false);
    }
  };

  return (
    <div
      className={`bg-white absolute flex flex-col items-start rounded-lg p2 w-38 overflow-y-auto max-h-60 shadow-md mt-2 ml-32${
        showDropdown ? "" : "hidden"
      }`}
    >
      <div className="sticky top-0 shadow-md rounded-md ">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="placeholder:text-gray-700 p-2 outline-none bg-white"
        />
      </div>
      {filteredList.map((item, i) => (
        <div className="flex w-full mt-2" key={i}>
          <h3 className="min-w-10 bg-green-400 rounded-custom flex items-center justify-center ml-2 p-2 font-bold">
            {item.firstletter}
          </h3>
          <h4
            className="min-w-14 ml-2 mt-2 cursor-pointer font-bold"
            onClick={() => handleNameClick(item.name)}
          >
            {item.name}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
