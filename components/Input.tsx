import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { UserSchemaType, userSchema } from "../Others/validations/userSchema";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  name: keyof UserSchemaType | string;
  icon?: React.ReactNode;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  name,
  type,
  placeholder,
  onChange,
  required,
  error = "",
  ...props
}) => {
  const Icon: any = icon;
  
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 flex items-center"
      > 
      
        {Icon && <span className=" mr-2">{<Icon />}</span>}
        {label}
      </label>
      <input
       autoFocus
        className="border-blue-700 border-b-2 mt-1 p-2 w-full rounded-md focus:outline-none "
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {error ? <span className="relative text-red-400 text-xs">{error}</span> : <span className="text-xs text-white">.</span>}
    </div>
  );
};

export default Input;


