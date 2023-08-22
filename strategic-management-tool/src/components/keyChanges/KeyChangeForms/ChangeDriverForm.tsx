import Button from "../../Button";
import DynamicFieldSet from "../../DynamicFieldSet";
import {useEffect, useState} from "react";
import InputField from "../../InputField";
import DisplayValuesComponent from "../../DisplayValuesComponent";
import {useDispatch, useSelector} from "react-redux";
import MultiSelectDropdown from "../../MultiSelectDropdown";
import {stakeholderActions} from "../../../_store/stakeholders.slice";
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

const ChangeDriverForm: React.FC<StakeholderFormProps> = ({ onChange }) => {
  const {user} = useSelector(state => state.auth)
  const params = useParams();
  const keyChangeId = params["*"]
  const [inputValue, setInputValue] = useState("");
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([defaultDivision]);
  const {departments} = useSelector(state => state.department)
  const {stakeholders} = useSelector(state => state.stakeholder)
  console.log("Stakeholders", stakeholders)
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

  useEffect(() => {
    dispatch(stakeholderActions.getStakeholdersByKeyChangeId({id: keyChangeId}));
  }, []);

  useEffect(() => {
    if (stakeholders?.data) {
      const newDisplayValues = stakeholders.data.map(stk => stk?.impacted_parties).flat();
      setDisplayValues(newDisplayValues);
    }
  }, [stakeholders]);

  console.log("Departments", departments)

  const handleKeyPress = (value: string) => {
    setDisplayValues([...displayValues, value]);
    saveStakeholder(value)
    setInputValue("");
  };

  const saveStakeholder = (value) => {
    dispatch(stakeholderActions.createStakeholder({
      impacted_parties: value,
      key_change_id: keyChangeId,
      project_id: user?.project_id
    })).then((res) => {
      console.log("Res", res)
    })
  }

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
    dispatch(stakeholderActions.addDepartments({
      departmentIds: options,
      key_change_id: keyChangeId,
      project_id: user?.project_id
    }))
  };

  const handleSave = () => {
  }

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
      <div
          className="flex flex-col w-full h-full overflow-y-auto max-h-[350px] scrollbar-thin scrollbar-thumb-zinc-200">
        {" "}
        <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
          <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
            <h1>Division/Department/Unit</h1>
          </div>
          <div
              className=" flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">

            <MultiSelectDropdown
                defaultOptions={defaultDepartmentOptions}
                options={departmentOptions}
                onOptionsSelected={handleSelectedOptions}
                id={"benefits"}
                label={"Division/Department/Unit"}
            />
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
            <div className="mt-20 mb-20">
              <DisplayValuesComponent
                  displayValues={displayValues}
                  handleDeleteValue={handleDeleteValue}
              />
            </div>
          </div>
        </div>
        {/*<div className="flex w-full h-full space-x-20 px-10  items-end justify-end ">*/}
        {/*  <Button*/}
        {/*      variant="primary"*/}
        {/*      size="lg"*/}
        {/*      onClick={() => handleSave()}*/}
        {/*      className="rounded-lg w-[40%] bg-primary-500"*/}
        {/*      type="button"*/}
        {/*  >*/}
        {/*    Save & Continue*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
  );
};

export default ChangeDriverForm;
