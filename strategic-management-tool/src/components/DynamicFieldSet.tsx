import React, { ChangeEventHandler } from "react";
import InputField from "./InputField";
import del from "../assets/images/delete.svg";

interface DynamicFieldProps {
  data: any[];
  setData: (newData: any[]) => void;
  dataStructure: Record<
    string,
    | "text"
    | "password"
    | "email"
    | "number"
    | "textarea"
    | "search"
    | "datepicker"
  >; // changed string to the specified types
  idBase: string;
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  characterLimits: Record<string, number>;
  width: number;
}
const DynamicFieldSet: React.FC<DynamicFieldProps> = ({
  data,
  setData,
  dataStructure,
  idBase,
  labels,
  placeholders,
  characterLimits,
  width,
}) => {
  const handleDataChange = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const index = Number(e.target.id.split("_")[2]);
    const field = e.target.id.split("_")[1];
    handleDataChange(index, field, e.target.value);
  };

  const handleDelete = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };


  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="flex h-full w-full space-x-6 items-center">
          {Object.keys(dataStructure).map((field, fieldIndex) => (
            <div
              key={fieldIndex}
              className="flex items-center w-full space-x-4"
            >
              <InputField
                id={`${idBase}_${field}_${index}`}
                label={labels[field]}
                value={item[field]}
                defaultValue={item[field]}
                onChange={handleChange}
                type={dataStructure[field]}
                placeholder={placeholders[field]}
                onClick={() => {
                  console.log("Clicked from", item[field])
                }}
                characterLimit={
                  dataStructure[field] === "text" ||
                  dataStructure[field] === "textarea"
                    ? "240"
                    : undefined
                }
                className="w-full m-0"
              />
            </div>
          ))}
          <button
            onClick={() => handleDelete(index)}
            className="px-3 py-3  bg-red-100 rounded-full"
          >
            <img src={del} alt="" width={width} />
          </button>
        </div>
      ))}
    </>
  );
};

export default DynamicFieldSet;
