// @ts-nocheck

import React, {FC, useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import plus from "../../assets/images/plus.svg";
import del from "../../assets/images/delete.svg";
import {useDispatch} from "react-redux";
import {budgetActions} from "../../_store";

export interface DropdownOption {
  title: string;
  route: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelectionChange: (options: DropdownOption[]) => void;
  onClick: any
}

// const option = {
//   id: "1",
//   title: "option 1",
//   route: `/project/dashboard/budget/1`,
// }

const BudgetDropdown: FC<DropdownProps> = ({ options, onSelectionChange, selectedBudgetItems }) => {
  // const {user} = useSelector(state => state.auth)
  // const {budgets} = useSelector(state => state.budget)
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const [activeOption, setActiveOption] = useState<DropdownOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  // const paramValue = params["*"]
  const dispatch = useDispatch()
  const buttonRef = useRef();

  useEffect(() => {
      setSelectedOptions(selectedBudgetItems)
  }, [options] )

  const handleBudgetItem = (id: string) => {
    //@ts-ignore
    dispatch(budgetActions.getBudgetByBudgetItemId({id}))
  }

  const handleSelect = (option: DropdownOption) => {
    //@ts-ignore
    if (!selectedOptions.find((opt) => opt.title === option.title)) {
      setSelectedOptions((prevOptions) => {
        const newOptions = [...prevOptions, option];
        onSelectionChange(newOptions);
        setActiveOption(option); // Set the newly selected option as the active one
        return newOptions;
      });
    }
    setIsOpen(false);
  }


  const handleDelete = (option: DropdownOption) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = prevOptions.filter(
        (opt) => opt.title !== option.title
      );

      onSelectionChange(newOptions);

      return newOptions;
    });
    if (activeOption?.title === option.title) {
      setActiveOption(null);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleActiveOption = (option: DropdownOption) => {
    setActiveOption(option);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex items-center justify-center w-full  space-x-2 rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-300"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <h1 className="w-full">Add Budget Item</h1>

          <img src={plus} alt="" width={20} />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 top-12 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-[280px] scrollbar-thin scrollbar-thumb-zinc-200">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`block px-6 py-3 w-full text-left text-sm ${
                  activeOption?.title === option.title
                    ? "bg-primary-50 text-primary-500"
                    : "text-gray-700 hover:bg-primary-50 active:bg-primary-50 hover:text-gray-900"
                }`}
                role="menuitem"
                disabled={
                  !!selectedOptions.find((opt) => opt.title === option.title)
                }
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full h-full py-4 overflow-y-auto max-h-[300px] scrollbar-none scrollbar-thumb-zinc-200 border-b border-border border-opacity-30">

        {selectedOptions?.map((option, index) => (
          <div
            key={index}
            className={`mt-6 flex w-full justify-between items-center px-2 py-3 rounded-md ${
              activeOption?.title === option.title
                ? "bg-primary-50 text-primary-500"
                : "hover:bg-primary-50 hover:text-gray-700"
            }`}
            onClick={() => handleActiveOption(option)}
          >
            <Link
                ref={buttonRef}
                onClick={(e) => {
                  handleBudgetItem(option.id)
                  // alert(option.id)
                }}
              to={option.route}
              className={`hover:text-primary-500 hover:font-medium w-[80%] ${
                activeOption?.title === option.title ? "text-primary-500" : ""
              }`}
            >
              <h1 className="text-sm">{option.title}</h1>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(option);
              }}
              className="text-red-500 hover:underline"
            >
              <img src={del} alt="" width={14} />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default BudgetDropdown;
