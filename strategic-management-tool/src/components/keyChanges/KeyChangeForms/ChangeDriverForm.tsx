import Button from "../../Button";
import DynamicFieldSet from "../../DynamicFieldSet";
import {useEffect, useState} from "react";
import InputField from "../../InputField";
import DisplayValuesComponent from "../../DisplayValuesComponent";
import {useDispatch, useSelector} from "react-redux";
import MultiSelectDropdown from "../../MultiSelectDropdown";

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

const ChangeDriverForm: React.FC<StakeholderFormProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([defaultDivision]);
  const {departments} = useSelector(state => state.department)
  const [departmentOptions, setDepartmentOptions] = useState([])
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [defaultDepartmentOptions, setDefaultDepartmentOptions] = useState([])
  const dispatch = useDispatch()
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    onChange?.(e);
  }

  useEffect(() => {
    const mappedDepartments = departments?.data?.map((dpt)=> {
      return {
        name: dpt.name,
        value: dpt.id
      }
    })
    setDepartmentOptions(mappedDepartments)
  },[departments])

  console.log("Departments", departments)

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

  const handleSelectedOptions = (options) => {
    setSelectedDepartments(options);
  };

  const handleSave = () => {
    dispatch()
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-200">
      {" "}
      <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
        <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
          <h1>Division/Department/Unit</h1>
          {/*<Button*/}
          {/*  size="md"*/}
          {/*  variant="primary"*/}
          {/*  onClick={addDivision}*/}
          {/*  type="submit"*/}
          {/*  className="w-[25%] m-0 bg-primary-500 rounded-lg"*/}
          {/*>*/}
          {/*  Add*/}
          {/*</Button>*/}
        </div>
        <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">

          <MultiSelectDropdown
              defaultOptions={defaultDepartmentOptions}
              options={departmentOptions}
              onOptionsSelected={handleSelectedOptions}
              id={"benefits"}
              label={"Division/Department/Unit"}
          />

          {/*<DynamicFieldSet*/}
          {/*  data={divisions}*/}
          {/*  setData={setDivisions}*/}
          {/*  dataStructure={defaultStructure}*/}
          {/*  idBase="benefits"*/}
          {/*  labels={{*/}
          {/*    content: "Division/Department/Unit",*/}
          {/*  }}*/}
          {/*  placeholders={{*/}
          {/*    content: "Enter the department name",*/}
          {/*  }}*/}
          {/*  characterLimits={characterLimits}*/}
          {/*  width={20}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-10 py-10  space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-0">
          <h1 className="text-[20px]">
            Who is the Responsible Senior Stakeholder to manage benefit/make
            decisions
          </h1>
        </div>
        <div className="flex flex-col w-full  ">
          <InputField
            id="email"
            label="(Who in business is responsible for this area/ ensuring that the benefit is realized/ has to
approve the change?)"
            value={inputValue}
            onChange={handleInputChange}
            onEnterPress={handleKeyPress}
            type="textarea"
            placeholder="Provide the necessary information"
            required
            className="w-full h-[200px] "
            characterLimit={240}
          />
          <div className="mt-20">
            <DisplayValuesComponent
              displayValues={displayValues}
              handleDeleteValue={handleDeleteValue}
            />
          </div>
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

export default ChangeDriverForm;
