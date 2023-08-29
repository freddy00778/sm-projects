// @ts-nocheck

import InputField from "../../InputField";
import {useEffect, useState} from "react";
import DisplayValuesComponent from "../../DisplayValuesComponent";
import Button from "../../Button";

import DynamicFieldSet from "../../DynamicFieldSet";
import MultiSelectDropdown from "../../MultiSelectDropdown";
import {stakeholderActions} from "../../../_store/stakeholders.slice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
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
  const {user} = useSelector(state => state.auth)
  const {affectedStakeholders} = useSelector(state => state.stakeholder)
  const params = useParams()
  const keyChangeId = params["*"]
  const [inputValue, setInputValue] = useState("");
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([defaultDivision]);
  const [departmentOptions, setDepartmentOptions] = useState([])
  const [defaultDepartmentOptions, setDefaultDepartmentOptions] = useState([])
  const {departments} = useSelector(state => state.department)
  const [selectedDepartments, setSelectedDepartments] = useState([])


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(stakeholderActions.getStakeholdersByKeyChangeId({id: keyChangeId}));
    dispatch(stakeholderActions.getAffectedStakeholders({key_change_id: keyChangeId}));
  }, [keyChangeId]);

  useEffect(() => {
    if (affectedStakeholders?.data) {
      const newDisplayValues = affectedStakeholders.data.map(stk => stk?.name).flat();
      setDisplayValues(newDisplayValues);
    }
  }, [affectedStakeholders]);

  useEffect(() => {
    const mappedDepartments = departments?.data?.map((dpt)=> {
      return {
        name: dpt.name,
        value: dpt.id
      }
    })
    setDepartmentOptions(mappedDepartments)
  },[departments])

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };


  const handleKeyPress = (value: string) => {
    setDisplayValues([...displayValues, value]);
    dispatch(stakeholderActions.addAffectedStakeholder({
      name: value,
      key_change_id: keyChangeId,
      project_id: user?.project_id
    }))
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
    console.log("Options", options)
    dispatch(stakeholderActions.addAffectedStakeholderDepartments({
      departmentIds: options,
      key_change_id: keyChangeId,
      project_id: user?.project_id
    }))
  };

  if (!keyChangeId) {
    return (
        <div className="flex items-center justify-center h-80">
          <div className="p-8 border border-gray-300 shadow-lg rounded-lg bg-white max-w-md">
            <p className="text-center text-xl text-gray-700 font-semibold mb-4">Oops!</p>
            <p className="text-center text-gray-600">
              Please select a key change.
            </p>
          </div>
        </div>
    );
  }
  return (
      <div className="flex flex-col w-full h-full overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-zinc-200">
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
            <div className="mt-20 mb-30">
              <DisplayValuesComponent
                  displayValues={displayValues}
                  handleDeleteValue={handleDeleteValue}
              />
            </div>

          </div>
        </div>

        <div className="flex flex-col w-full px-10 py-4  space-y-16 -mt-10  ">
          <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
            <h1>Division/Department/Unit</h1>
          </div>
          <div
              className=" flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
            <MultiSelectDropdown
                className={`-mt-1`}
                defaultOptions={defaultDepartmentOptions}
                options={departmentOptions}
                onOptionsSelected={handleSelectedOptions}
                id={"benefits"}
                label={"Division/Department/Unit"}
            />
          </div>
        </div>

        <div className="flex w-full h-full space-x-20 px-10  items-end justify-end">
          <Button
              variant="primary"
              size="lg"
              onClick={() => {}}
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