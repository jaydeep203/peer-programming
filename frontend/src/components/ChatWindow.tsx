import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { twMerge } from "tailwind-merge";
import { user } from "../store/atoms";
import ScrollToBottom from "react-scroll-to-bottom";

interface chatWindowProps{
  messages: {username:string, message:string}[] | null;
  sendMessage: (message:string) => void;
}

const ChatWindow:React.FC<chatWindowProps> = ({
  messages, sendMessage
}) => {
  const [message, setMessage] = useState("");
  const username = useRecoilValue(user)?.username || "";

  const onStartMessages = () => {
    sendMessage("Hi👋");
  }


  return (
    <div className="w-full h-full max-h-full min-h-full bg-background p-2 rounded-lg shadow-md text-white flex flex-col">
      {/* Chat header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold">Chat Window</h2>
        <button onClick={onStartMessages} className="bg-primary hover:bg-primary-hover text-white px-3 py-1 text-xs rounded-lg focus:outline-none">
          Start Chat
        </button>
      </div>

      {/* Messages area */}
      <div className="bg-[#1A1A1A] p-3 rounded-lg mb-3 max-h-[68%] h-full">

        <ScrollToBottom className="
          flex flex-col items-center overflow-y-scroll scrollbar-hidden max-h-full h-full w-full
        ">
          <div className="
            flex flex-col items-center max-h-full h-full w-full
          " >
          { 
            messages?.map((item, index) => (

              <div key={index} className={twMerge(`
                  mb-2 p-2 bg-[#282828] rounded-lg
                  flex flex-row
              `, (username===item.username)?"self-end mr-1":"self-start ml-1 bg-primary bg-opacity-90" )}>
                <p>
                  {item.username}
                </p>
                <p>
                  : {item.message}
                </p>
              </div>
            ))
          }
          </div>
        </ScrollToBottom>
      </div>

      {/* Message input and send button */}
      <form onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }} className="flex items-center border-t border-gray-600 pt-2">
          <input
            type="text"
            className="w-[90%] p-2 rounded-l-lg bg-[#282828] text-white focus:outline-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-r-lg focus:outline-none flex items-center justify-center"
          >
            <FaPaperPlane />
          </button>
      </form>
    </div>
  );
};

export default ChatWindow;
