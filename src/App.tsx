import React, { useState } from "react";
import Dropdown from "./Component/Dropdown";
import "./App.css";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaValueWhenPosting, setTextareaValueWhenPosting] = useState("");

  const handleNameSelection = (name: any) => {
    setSelectedName(name);
    setShowDropdown(false);
    const atIndex = textareaValue.lastIndexOf("@");
    const newValue =
      atIndex !== -1
        ? textareaValue.slice(0, atIndex + 1) +
          name +
          " " +
          textareaValue.slice(atIndex + 1)
        : " " + name;
    setTextareaValue(newValue);
  };

  const handleTextareaChange = (event: any) => {
    const value = event.target.value;
    setSelectedName(value);
    setShowDropdown(value.includes("@"));
    setTextareaValue(value);
  };

  const handlePost = () => {
    const postContent = textareaValue.trim();
    console.log("Post content:", postContent);
    setTextareaValueWhenPosting(postContent);
  };

  const renderTextareaContent = () => {
    const segments = textareaValueWhenPosting.split(`@${selectedName}`);
    return segments.map((segment, index) => {
      if (index === segments.length - 1) {
        return <span key={index}>{segment}</span>;
      } else {
        return (
          <span key={index} className="font-bold">
            {segments}
            <span className="text-purple-500">{selectedName}</span>
          </span>
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="flex flex-col items-center mb-10 ">
        <textarea
          className="placeholder-gray-400 border border-gray-300 rounded-md p-2 "
          placeholder="Create a post..."
          rows={3}
          cols={70}
          onChange={handleTextareaChange}
          value={textareaValue}
        />
        <button
          className="mt-2 ml-custom bg-purple-500 hover:bg-blue-600 text-black font-bold py-2 px-6 rounded"
          onClick={handlePost}
        >
          Post
        </button>

        {showDropdown && <Dropdown handleNameSelection={handleNameSelection} />}

        {textareaValueWhenPosting && (
          <div className="pt-2 ">
            <div className="bg-white w-custom h-custom rounded-md p-4 shadow-md border-inherit border-color: inherit;">
              {renderTextareaContent()}
              <hr className="my-4 mt-20 border-1 border-gray-500" />
              <div className="flex">
                <h3 className="bg-red-400 font-bold rounded-custom w-10 h-10 flex items-center justify-center mt-1">
                  F
                </h3>
                <div className="ml-2 mb-8">
                  <h5 className="font-bold">Florance angle</h5>
                  <p className="text-gray-400 font-bold text-sm">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
