import InputField from "../../InputField";
import { useState } from "react";
import DisplayValuesComponent from "../../DisplayValuesComponent";
import Button from "../../Button";

import DynamicFieldSet from "../../DynamicFieldSet";
interface StakeholderFormProps {
  onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
interface Division {
  text: string;
}

const defaultStructure: Record<
    string,
    | "number"
    | "text"
    | "password"
    | "email"
    | "textarea"
    | "search"
    | "datepicker"
    > = {
  content: "text",
};

const characterLimits: Record<string, number> = {
  content: 120,
};
const defaultDivision: Division = {
  text: "How the change adds value",
};

const StakeholderForm: React.FC<StakeholderFormProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const [displayValues, setDisplayValues] = useState<string[]>([]);

  const [divisions, setDivisions] = useState<Division[]>([defaultDivision]);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyPress = (value: string) => {
    setDisplayValues([...displayValues, value]);
    setInputValue("");
  };

  const handleDeleteValue = (index: number) => {
    const newValues = [...displayValues];
    newValues.splice(index, 1);
    setDisplayValues(newValues);
  };

  const addDivision = () => {
    setDivisions([...divisions, defaultDivision]);
  };

  return (
      <div className="flex flex-col w-full h-full overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-200">
        <div className="flex flex-col w-full px-10 py-10  space-y-16  ">
          <div className="w-full flex items-center border-b border-b-border py-0">
            <h1 className="text-[20px]">
              Who will be impacted/affected by this key change?
            </h1>
          </div>
          <div className="flex flex-col w-full">
            <InputField
                id="email"
                label="Name the Stakeholder or Stakeholder Group (Internal & External)"
                value={inputValue}
                onChange={handleInputChange}
                onEnterPress={handleKeyPress}
                type="textarea"
                placeholder="Provide the names of the stakeholders"
                required
                className="w-full "
                characterLimit={120}
            />
            <div className="mt-4">
              <DisplayValuesComponent
                  displayValues={displayValues}
                  handleDeleteValue={handleDeleteValue}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
          <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
            <h1>Division/Department/Unit</h1>
            <Button
                size="md"
                variant="primary"
                onClick={addDivision}
                type="submit"
                className="w-[25%] m-0 bg-primary-500 rounded-lg"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
            <DynamicFieldSet
                data={divisions}
                setData={setDivisions}
                dataStructure={defaultStructure}
                idBase="benefits"
                labels={{
                  content: "Division/Department/Unit",
                }}
                placeholders={{
                  content: "Enter the department name",
                }}
                characterLimits={characterLimits}
                width={20}
            />
          </div>
        </div>

        <div className="flex w-full h-full space-x-20 px-10  items-end justify-end">
          <Button
              variant="primary"
              size="lg"
              onClick={() => alert("Objective Saved")}
              className="rounded-lg w-[40%] bg-primary-500"
              type="button"
          >
            Save & Continue
          </Button>
        </div>
      </div>
  );
};

export default StakeholderForm;