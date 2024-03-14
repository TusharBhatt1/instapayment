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
        className="border-blue-400 border-b-2 mt-1 p-2 w-full rounded-md focus:border-2 focus:border-blue-100"
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {error ? <span className="text-red-400 text-xs">{error}</span> : <span className="text-white">.</span>}
    </div>
  );
};

export default Input;

// return (
//   <div className='mb-4 flex justify-center items-center mt-4 gap-10'>
//     <label className='block text-center mt-4 mb-1'>{label}</label>
//     <div className='relative'>

//       <input
//         className={`

//           ${isError ? 'border-red-400' : 'border-slate-500'}
//           w-full py-2
//           text-gray-500 border rounded-md outline-none
//           bg-gray-50 focus:bg-white focus:border-indigo-600
//         `}
//         name={name}
//         value={value}
//         onChange={onChange}
//         type={type}
//         required={required}
//         placeholder={placeholder}
//       />
//       <div className='absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-transform origin-left transform scale-x-0'></div>
//     </div>
//   </div>
// );
