import { Link } from "react-router-dom";
import Button from "../ui/Button";


const CodeHeader = () => {
  
  return (
    <div className="flex items-center justify-between p-3 h-[8vh] bg-background text-white">
      {/* Left Section: Project Name and Language */}
      <div className="flex items-center space-x-4">
        <Link to={"/"} className="text-gray-300 hover:text-white text-xl">
          ←
        </Link>
        <span className="font-semibold">Project Name</span>
        <select className="bg-gray-700 text-white p-1 rounded focus:outline-none">
          <option>Language</option>
          <option>JavaScript</option>
          <option>Python</option>
          <option>C++</option>
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
          className="bg-[#279F3D] text-white text-xs py-1.5"
          text="Run Code"
          primary={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default CodeHeader;
