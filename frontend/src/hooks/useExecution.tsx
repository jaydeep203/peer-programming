import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";



const useExecution = (projectId:string, fileId:string) => {
    const [executionLoading, setExecutionLoading] = useState(false);
    const [executedResponse, setExecutedResponse] = useState({});
    const [executedError, setExecutedError] = useState(null);

    useEffect(() => {
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

        handleRun();
    });


    return {executedResponse, executionLoading, executedError};


}

export default useExecution;