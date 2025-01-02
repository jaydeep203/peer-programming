import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


const useFetchProject = (projectId:string) => {
  const [project, setProject] = useState({});
  const [fileId, setFileId] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const minifiedCode = (code:string) => {
    return code.replace(/\n/g, "\\n").replace(/"/g, '\\"');
  }

  const beautifyCode = (minifiedCode:string) => {
    return minifiedCode.replace(/\\n/g, "\n").replace(/\\"/g, '"');
  };

  useEffect(() => {
    const fetchProject = async() => {
      try{

        const response = await axios.get(`${BACKEND_URL}/api/v1/project/${projectId}`, {headers: {
          Authorization: localStorage.getItem("token")
        }});
        if(response?.data?.project){
          const projectData = response.data.project;
          setProject(projectData);
          setLanguage(projectData.file.language);
          setFileId(projectData.file.id);
          const minifiedContent = response.data.project.file.content || "write your code here..";
          const beautifiedContent = beautifyCode(minifiedContent);
          setContent(beautifiedContent);
  
        }
  
        setLoading(false);
  
      }catch(err){
        console.log(err);
        setError(err);
        setLoading(false);
      }

    }

    fetchProject();

  }, [projectId]);

  return {loading, error, project, fileId, language, content, setContent, setLanguage, minifiedCode, beautifyCode};
    

}

export default useFetchProject;