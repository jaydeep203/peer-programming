import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatWindow = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Send message:", message);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full bg-background p-2 rounded-lg shadow-md text-white flex flex-col">
      {/* Chat header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold">Chat Window</h2>
        <button className="bg-primary hover:bg-primary-hover text-white px-3 py-1 text-xs rounded-lg focus:outline-none">
          Start Chat
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-grow bg-[#1A1A1A] p-3 rounded-lg overflow-y-auto mb-3">
        {/* Placeholder messages */}
        <div className="mb-2 p-2 bg-[#282828] rounded-lg">
            User: Hello!
        </div>
        <div className="mb-2 p-2 bg-[#282828] rounded-lg">
            You: Hi there!
        </div>
        {/* Add more messages dynamically here */}
      </div>

      {/* Message input and send button */}
      <div className="flex items-center border-t border-gray-600 pt-2">
        <input
          type="text"
          className="flex-grow p-2 rounded-l-lg bg-[#282828] text-white focus:outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-primary hover:bg-blue-700 text-white px-5 py-3 rounded-r-lg focus:outline-none flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
