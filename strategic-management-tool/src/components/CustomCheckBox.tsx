import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center cursor-pointer">
      <label htmlFor={id} className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          className="w-6 h-6 border border-border rounded-md focus:outline-none focus:shadow-outline focus:ring-primary-200 focus:border-primary-200 focus:border-2 sr-only"
          checked={checked}
          onChange={onChange}
        />
        <span
          className={`${
            checked ? "bg-primary-500" : "bg-white"
          } w-6 h-6 border border-stroke rounded-md inline-block`}
        >
          {checked && (
            <FontAwesomeIcon
              icon={faCheck}
              className="text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            />
          )}
        </span>
      </label>
      <label htmlFor={id} className="ml-2 text-black font-normal text-lg">
        {label}
      </label>
    </div>
  );
};
