import InputField from "../InputField";
import InputDropdown from "../InputDropdown";
import Button from "../Button";
import React, { useState } from "react";

import { DataType } from "../../../types";

interface LessonModalFormProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  division: string;
  setDivision: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
  dataLength: number;
  onClose: () => void;
}

const LessonModalForm: React.FC<LessonModalFormProps> = ({
                                                           category,
                                                           setCategory,
                                                           division,
                                                           setDivision,
                                                           text,
                                                           setText,
                                                           addData,
                                                           dataLength,
                                                           onClose,
                                                         }) => {
  const options = [
    {name: "Strategic Change", value:"strategic-change"},
    {name: "BAU Change", value:"bau-change"},
    {name: "Annual Corporate Initiative", value: "annual-corporate-initiative"}
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  }

  const handleSave = () => {

    const date = new Date(category); // Convert string to date
    const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
    }-${date.getFullYear()}`;
    addData({
      No: dataLength + 1,
      Type: selectedOption,
      Description: text,
      "Date Logged": formattedDate,
      "Logged By": division,
    });
    setCategory("");
    // setDivision("");
    // setText("");
    setSelectedOption(options[0]); // Open the modal when button is clicked
    onClose();
  };
  return (
      <form className="w-full h-full   ">
        <div className="flex flex-col w-full h-full  space-y-4 overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-zinc-200 ">
          <h1 className="text-primary-500 text-[18px]">Add Lessons Log</h1>
          <div className="flex w-full h-full space-x-12 items-start justify-between">
            <div className="flex flex-col w-2/4 h-full space-y-4">
              <InputDropdown
                  id="dropdown"
                  header="Type"
                  label={`${selectedOption}`}
                  options={options}
                  onOptionSelected={handleOptionSelected}
                  className=" w-full m-0"
              />
              <InputField
                  id="email"
                  label="Date Logged"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="datepicker"
                  required
                  className="w-full m-0"
              />
              <InputField
                  id="email"
                  label="Logged By"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  type="text"
                  placeholder="Enter the logger name"
                  required
                  className="w-full m-0"
              />
            </div>
            <div className="flex flex-col w-2/4 space-y-4 mt-6">
              <InputField
                  id="email"
                  label="Description"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  type="textarea"
                  placeholder="Describe the lesson"
                  required
                  className="w-full m-0 h-[320px] "
                  characterLimit={120}
              />
            </div>
          </div>
          <div className="flex w-full items-end justify-end h-full">
            <Button
                variant="primary"
                size="lg"
                onClick={handleSave}
                className="rounded-lg w-[30%] mt-6 bg-primary-500"
                type="button"
            >
              Add lessons
            </Button>
          </div>
        </div>
      </form>
  );
};

export default LessonModalForm;