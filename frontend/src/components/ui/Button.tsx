import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import CircularLoader from "../loader/CircularLoader";

interface ButtonProps {
  text: string;
  primary: boolean;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?:string;
  loading?:boolean;
  disabled?:boolean;
  Icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  text,
  primary,
  onClick,
  type = "button",
  className,
  loading,
  disabled,
  Icon
}) => {
  return (
      <button
          disabled={disabled}
          onClick={onClick}
          type={type}
          className={twMerge(`
            ${primary ? 
              'text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50' 
              : 'bg-secondary hover:bg-secondary-hover text-secondary-text'} 
              rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition
            `, className )}
      >
          {loading ? <CircularLoader /> : text} {!loading && Icon && <Icon className="ml-2" />}
      </button>
  );
}

export default Button