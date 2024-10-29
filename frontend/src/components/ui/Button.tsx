import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  primary: boolean;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?:string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  primary,
  onClick,
  type = "button",
  className
}) => {
  return (
      <button
          onClick={onClick}
          type={type}
          className={twMerge(`
            ${primary ? 
              'text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50' 
              : 'bg-secondary hover:bg-secondary-hover text-secondary-text'} 
              rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition
            `, className )}
      >
          {text}
      </button>
  );
}

export default Button