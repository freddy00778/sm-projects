import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string; // default, primary, info, success, warning, danger, dark
  size?: string; // sm, md, lg
  disabled?: boolean;
  className?: string;
  type: "button" | "submit" | "reset";
}
const Button: React.FC<Props> = ({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled,
  type = "submit",
  ...rest
}) => {
  return (
    <button
      className={
        `btn ${variant} ${size} ${className}` + (disabled ? " disabled" : "")
      }
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {disabled ? <ClipLoader size={20} color="#fffff" /> : children}
    </button>
  );
};

export default Button;
