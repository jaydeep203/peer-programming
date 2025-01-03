import React from "react";

interface executedResponseProps{
    executedRes:string;
    error:string;
    input:string;
    onChange: (e:any) => void;
}

const ExecutedResponse:React.FC<executedResponseProps> = ({executedRes, error, input, onChange}) => {

  return (
    <div className='
        w-full
    '>
      <div className="flex flex-col gap-2 text-white">
        <h1><strong>Input:-</strong> <span className="text-neutral-300 text-sm">*Enter multiline input here</span> </h1>
        <input type="text" 
          name="name" 
          className="bg-dark-gray border border-gray-300 
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 
                    dark:text-white" placeholder="Enter Your Input Here..." required 
          value={input}
          onChange={onChange}
        />
      </div>
        {
          error ? (
            <p className="
              text-primary
              font-mono
            ">
              
              {error ? "Error : " + error : ""} 
            </p>
          )
          : (
            <p className="
              text-white
              font-mono
            ">
              
              {executedRes ? "Output : " + executedRes : ""}
            </p>
          )
        }

        
    </div>
  )
}

export default ExecutedResponse