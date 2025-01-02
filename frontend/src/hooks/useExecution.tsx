import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";



const useExecution = (projectId:string, fileId:string) => {
    const [executionLoading, setExecutionLoading] = useState(false);
    const [executedResponse, setExecutedResponse] = useState({});
    const [executedError, setExecutedError] = useState(null);

        const handleRun = async() => {
            try{
                setExecutionLoading(true);
        
                const res = await axios.get(`${BACKEND_URL}/api/v1/${projectId}/${fileId}/execute`, {headers:{
                  Authorization: localStorage.getItem("token")
                }});
        
                if(res?.data){
                  setExecutedResponse(res.data);
                }
        
                setExecutionLoading(false);
        
            }catch(err){
              console.log(err);
              setExecutedError(err);
              setExecutionLoading(false);
            }
        }


    return {executedResponse, executionLoading, executedError, handleRun};


}

export default useExecution;