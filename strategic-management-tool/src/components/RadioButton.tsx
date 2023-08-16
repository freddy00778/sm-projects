import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type RadioButtonProps = {
  content?: string | JSX.Element;
  title: string | JSX.Element;
  selected: boolean;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  contentClassName?: string; // New prop for content styling
};

const RadioButton: React.FC<RadioButtonProps> = ({
  content,
  selected,
  title,
  name,
  value,
  className,
  contentClassName, // New prop
  onChange,
}) => {
  return (
    <div
      className={`flex w-full  space-x-4 border-2 rounded-xl py-4
        ${selected ? "border-primary-500" : "border-[#DBDBDB]"}`}
    >
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className={`hidden ${className}`}
        checked={selected}
        onChange={() => onChange(value)}
      />
      <label
        htmlFor={value}
        className="flex w-full flex-col cursor-pointer space-y-4"
      >
        <div className="flex w-full  justify-between px-4 ">
          <div className="font-semibold text-[18px]">{title}</div>
          <div
            className={`flex justify-center items-center w-6 h-6  border border-[#DBDBDB] rounded-full 
          ${selected ? "bg-primary-500" : "bg-white"}`}
          >
            {selected && (
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            )}
          </div>
        </div>
        <div className={`w-full flex ${contentClassName} px-4`}>{content}</div>
      </label>
    </div>
  );
};

export default RadioButton;
