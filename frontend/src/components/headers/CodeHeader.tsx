import { Link } from "react-router-dom";
import Button from "../ui/Button";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

interface projectProps{
  name: string;
  language: string;
  onChange: (e: any) => void;
  execute: () => void;
  executionLoading: boolean;  
}

const CodeHeader:React.FC<projectProps> = ({
    name, language, onChange, execute, executionLoading
}) => {

  
  return (
    <div className="flex items-center justify-between p-3 h-[8vh] bg-background text-white">
      {/* Left Section: Project Name and Language */}
      <div className="flex items-center space-x-4">
        <Link to={"/"} className="text-neutral-200 hover:text-white text-xl">
          <LuArrowLeft />
        </Link>
        <span className="font-semibold text-white"> {name}</span>
        
        <select defaultValue={language} onChange={onChange} className="bg-gray-700 text-white p-1 rounded focus:outline-none">
          <option value={"java"}>Java</option>
          <option value={"cpp"} >C++</option>
          <option value={"c"} >C</option>
          <option value={"py"}>Python</option>
          <option value={"js"}>JavaScript</option>
        </select>
        
      </div>

      {/* Middle Section: Collaborate Icon */}
      <div>
        <button className="text-gray-300 hover:text-white">
          {/* Replace with actual icon or SVG for collaboration */}
          🤝
        </button>
      </div>

      {/* Right Section: Share and Run Code Buttons */}
      <div className="flex space-x-4">
        <Button 
          text="Share"
          className="text-white text-xs py-1.5"
          primary
          onClick={() => console.log("I ma full")}
        />

        <Button 
          className="bg-[#279F3D] hover:bg-[#258537] text-white text-xs py-1.5"
          text="Run Code"
          primary={false}
          loading={executionLoading}
          onClick={execute}
        />
      </div>
    </div>
  );
};

export default CodeHeader;
