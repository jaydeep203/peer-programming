import React from "react";

interface executedResponseProps{
    executedRes:string;
    error:string;
}

const ExecutedResponse:React.FC<executedResponseProps> = ({executedRes, error}) => {
  return (
    <div className='
        w-full
    '>
        {
          error!="" && (
            <p className="
              text-primary
              font-mono
            ">
              Error : 
              { error}
            </p>
          )
        }

        <p className="
          text-white
          font-mono
        ">
          {executedRes}
        </p>
    </div>
  )
}

export default ExecutedResponse