import { useEffect, useState } from "react"
import CodeEditor from "../components/CodeEditor"
import CodeHeader from "../components/headers/CodeHeader"
import ChatWindow from "../components/ChatWindow";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


const Project = () => {

  const [content, setContent] = useState("");
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("");
  const {projectId} = useParams();
  const [fileId, setFileId] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const onChange = (newText:string) => {
    setContent(newText);

    if(stompClient){
      stompClient.publish({
        destination: `/app/edit/${projectId}`,
        body: JSON.stringify({fileId, content: newText, username:"currentUser"})
      });
    }
  }

  const handleLanguage = (e:any) => {
    setLanguage(e.target.value);
  }


  const fetchProject = async() => {

    try{

      const response = await axios.get(`${BACKEND_URL}/api/v1/project/${projectId}`, {headers: {
        Authorization: localStorage.getItem("token")
      }});
      if(response?.data?.project!=null){
        setProject(response.data.project);
        setLanguage(response.data.project.file.language);
        setContent(response.data.project.file.content);
        setFileId(response.data.project.file.id);
        if(response.data.project.file.content===""){
          setContent("write your code here..");
        }
      }

      setLoading(false);

    }catch(err){
      console.log(err);
      setLoading(false);
    }

  }

  

  const saveProject = async() => {
      try{

        const response = await axios.put(`${BACKEND_URL}/api/v1/${projectId}/${fileId}`, {
          content, language
        }, {headers:{Authorization:localStorage.getItem("token")}});

        console.log(response);

      }catch(err){
        console.log(err);
      }
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
      client.subscribe(`/topic/edit/${projectId}`, (message) => {
        const update = JSON.parse(message.body);
        if(update.fileId === fileId){
          setContent(update.content);
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
    fetchProject();

    setupWebSocket();

    return () => {
      if(stompClient){
        stompClient.deactivate();
      }
    };
  }, []);



  if(loading){
    return (
      <div className="text-2xl text-white bg-black"> Loading...</div>
    )
  }

  return (
    <>
      <CodeHeader name={project?.name || ""} language={language|| ""} onChange={handleLanguage} />
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
              <CodeEditor content={content} onChange={onChange} />
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