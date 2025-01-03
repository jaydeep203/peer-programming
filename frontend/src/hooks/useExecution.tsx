import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";



const useExecution = (projectId:string, fileId:string) => {
    const [executionLoading, setExecutionLoading] = useState(false);
    const [executedResponse, setExecutedResponse] = useState({});
    const [executedError, setExecutedError] = useState(null);
    const [input, setInput] = useState("");

    const beautifyResponse = (minifiedResp:string) => {
      return minifiedResp.replace(/\\n/g, "\n").replace(/\\"/g, '"');
    };

        const onChangeInput = (e:any) => {
          setInput(e.target.value);
        }

        const handleRun = async() => {
            try{
                setExecutionLoading(true);
        
                const res = await axios.post(`${BACKEND_URL}/api/v1/${projectId}/${fileId}/execute`, {input} , {headers:{
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



    return {executedResponse, executionLoading, executedError, input, handleRun, onChangeInput};


}

export default useExecution;