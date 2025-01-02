import { useEffect, useState } from "react"
import CodeEditor from "../components/CodeEditor"
import CodeHeader from "../components/headers/CodeHeader"
import ChatWindow from "../components/ChatWindow";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ExecutedResponse from "../components/ExecutedResponse";
import { useRecoilValue } from "recoil";
import { user } from "../store/atoms";
import useFetchProject from "../hooks/useFetchProject";
import useExecution from "../hooks/useExecution";



const Project = () => {

  const {projectId} = useParams();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState<{username:string; message:string}[] | null>(null);

  const username = useRecoilValue(user)?.username || "";

  const {project, content, loading, language, fileId, error, setContent, setLanguage, minifiedCode, beautifyCode} = useFetchProject(projectId || "");

  const {executedResponse, executionLoading, executedError, handleRun} = useExecution(projectId || "", fileId);   

  const onChange = async(newText:string) => {
    setContent(newText);

    if(stompClient){
      const minifiedText = minifiedCode(newText);
      stompClient.publish({
        destination: `/app/edit/${projectId}`,
        body: JSON.stringify({fileId, content: minifiedText, username:"currentUser", language:language})
      });
    }
  }

  const sendMessage = (message:string) => {
    if(stompClient){
      stompClient.publish({
        destination: `/app/messages/${projectId}`,
        body: JSON.stringify({username:username, message:message})
      });
    }
  }

  const handleLanguage = (e:any) => {
    setLanguage(e.target.value);
  }


  const setupWebSocket = () => {

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found!");
      return;
    }

    const socket = new SockJS(`${BACKEND_URL}/ws?token=${token}`);
    const client = new Client({
      webSocketFactory : () => socket
    });

    client.onConnect = () => {
      client.subscribe(`/topic/edit/${projectId}`, async(message) => {
        const update = JSON.parse(message.body);
          const beautifiedContent = beautifyCode(update.content);
          setContent(beautifiedContent);
          setLanguage(update.language);
      });

      client.subscribe(`/topic/messages/${projectId}`, async(mes) => {
        const message = JSON.parse(mes.body);
        if (message.username !== username) {
          setMessages((prevMessages) => {
            // Avoid adding duplicate messages
            if (
              prevMessages &&
              prevMessages.some(
                (msg) =>
                  msg.username === message.username && msg.message === message.message
              )
            ) {
              return prevMessages;
            }
      
            return prevMessages
              ? [...prevMessages, { username: message.username, message: message.message }]
              : [{ username: message.username, message: message.message }];
          });
        }
        
      });

      console.log("Connected to WebSocket");

    };

    client.onStompError = (frame) => {
      console.error(`Broker reported error: ${frame.headers["message"]}`);
      console.error(`Additional details: ${frame.body}`);
    };

    client.activate();
    setStompClient(client);

  };


  
  

  // Fetch project
  useEffect(() => {

    if(!stompClient){
      setupWebSocket();
    }

    return () => {
      if(stompClient){
        stompClient.deactivate();
      }
    };


  }, [stompClient]);





  if(loading){
    return (
      <div className="text-2xl text-white bg-black"> Loading...</div>
    )
  }

  if(error){
    return (
      <div className="text-2xl text-white bg-black">
        {error}
      </div>
    )
  }

  return (
    <>
      <CodeHeader name={project?.name || ""} 
        executionLoading={executionLoading} 
        language={language|| ""} 
        onChange={handleLanguage} 
        execute={handleRun} 
      />
      <div className="
        w-full
        h-[92vh]
        bg-background
        flex
        items-center
      ">
          <div className="w-full flex flex-row h-[91vh] px-2 bg-background">
            {/* Main Code Editor Panel */}
            <div className="w-[62%] max-h-full h-full bg-[#282828] p-4 border border-gray-300">
              <CodeEditor content={content} onChange={onChange} language={language} />
            </div>

            {/* Right Section: Chat Window and Console */}
            <div className="w-[38%] flex flex-col bg-background">
              {/* Chat Window */}
              <div className="w-full max-h-[46vh] min-h-[46vh] h-[46vh] bg-[#1A1A1A] border border-gray-300 rounded">
                <ChatWindow messages={messages} sendMessage={sendMessage} />
              </div>

              {/* Console */}
              <div className="w-full h-full bg-[#282828] p-4 border border-gray-300 rounded">
                  <ExecutedResponse executedRes={executedResponse?.output} error={executedResponse?.error} />
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Project