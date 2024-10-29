import { useState } from "react"
import CodeEditor from "../components/CodeEditor"
import CodeHeader from "../components/headers/CodeHeader"
import ChatWindow from "../components/ChatWindow";


const Project = () => {

  const [code, setCode] = useState("");

  const onChange = (newText:string) => {
    setCode(newText);
  }



  return (
    <>
      <CodeHeader />
      <div className="
        w-full
        h-[92vh]
        bg-background
        flex
        items-center
      ">
          <div className="w-full flex flex-row h-[91vh] px-2 bg-background">
            {/* Main Code Editor Panel */}
            <div className="w-[62%] bg-[#282828] p-4 border border-gray-300">
              <CodeEditor onChange={onChange} />
            </div>

            {/* Right Section: Chat Window and Console */}
            <div className="w-[38%] flex flex-col bg-background">
              {/* Chat Window */}
              <div className="flex-1 bg-[#1A1A1A] border border-gray-300 rounded">
                <ChatWindow />
              </div>

              {/* Console */}
              <div className="flex-1 bg-[#282828] p-4 border border-gray-300 rounded">
                {/* Console component goes here */}
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Project