import { useState } from "react";
import { IconType } from "react-icons";
import { FiLoader } from "react-icons/fi";
interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  type?: "submit" | undefined;
  isProcessing?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  isProcessing,
  outline,
  small,
  type,
  icon: Icon,
}) => {
  const [clicked , setClicked]=useState(false)

  const handleClick = () => {
    if (onClick) {
      setClicked(true);
      setTimeout(() => setClicked(false), 500);
      onClick();
    }
  };
  return (
    <button
      type={type}
      disabled={disabled || clicked}
      onClick={handleClick}
      className={`
        relative
        m-auto
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-1/2
        ${outline ? "bg-white" : "bg-black"}
        ${outline ? "border-black" : "border-black"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {isProcessing ? (
        <FiLoader
          size={20}
          className="flex justify-center items-center animate-spin"
        />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
