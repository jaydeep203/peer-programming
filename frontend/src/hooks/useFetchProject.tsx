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

  const beautifyCode = async (code, language) => {
    // Implement your beautify logic here, or replace with a library like prettier.
    return code; // This is just a placeholder
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
          const beautifiedContent = await beautifyCode(minifiedContent, projectData.file.language);
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

  return {loading, error, project, fileId, language, content, setContent, setLanguage};
    

}

export default useFetchProject;