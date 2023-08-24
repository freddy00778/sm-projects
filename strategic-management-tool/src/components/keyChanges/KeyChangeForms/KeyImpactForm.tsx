import {useEffect, useState} from "react";
import Button from "../../Button";
import Technology from "./CheckLists/Technology";
import Organisation from "./CheckLists/Organisation";
import Governance from "./CheckLists/Governance";
import Suppliers from "./CheckLists/Suppliers";
import Training from "./CheckLists/Training";
import Customers from "./CheckLists/Customers";
import Employees from "./CheckLists/Employees";
import Assets from "./CheckLists/Assets";
import Process from "./CheckLists/Process";
import DynamicFieldSet from "../../DynamicFieldSet";
import {useDispatch, useSelector} from "react-redux";
import {departmentActions} from "../../../_store/department.slice";
import MultiSelectDropdown from "../../MultiSelectDropdown";
import {keyImpactActions} from "../../../_store/keyImpact.slice";
import {useParams} from "react-router-dom";
import {keyImpactDepartmentActions} from "../../../_store/keyImpactDepartment.slice";

interface KeyImpactFormProps {
  onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface Department {
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
  content: 240,
};

const defaultDepartment: Department = {
  text: "How the change adds value",
};
const KeyImpactForm: React.FC<KeyImpactFormProps> = () => {
  const dispatch = useDispatch()
  const {isLoading,departments} = useSelector(state => state.department)
  const {keyImpactDepartments} = useSelector(state => state.keyImpactDepartment)
  const [departmentOptions, setDepartmentOptions] = useState([])
  const [defaultDepartmentOptions, setDefaultDepartmentOptions] = useState([])
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const params = useParams()
  const keyChangeId = params["*"]

  useEffect(() => {
    dispatch(departmentActions.getDepartments())
    // dispatch(keyImpactDepartmentActions.getKeyImpactDepartmentByKeyChangeId({id: keyChangeId}))
  },[keyChangeId, dispatch])

  useEffect(() => {
    const mappedOptions = departments?.data?.map((dp) => {
      return {
        name: dp.name,
        value: dp.id
      }
    })

    setDepartmentOptions(mappedOptions)
  },[departments])

  console.log("Key impact department", keyImpactDepartments)

  useEffect(() => {
    const mappedOptions = keyImpactDepartments?.data?.map((dp) => {
      return {
        name: dp.name,
        value: dp.department_id
      }
    })

    setDefaultDepartmentOptions(mappedOptions)
  },[keyImpactDepartments])

  const handleSelectedOptions = (options) => {
    setSelectedDepartments(options);
  };

  console.log("Selected departments", selectedDepartments)

  const handleSave = () => {
    dispatch(keyImpactActions.createKeyImpact({
      key_change_id: keyChangeId,
      selectedDepartments
    }))
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
      <form
          className="flex flex-col w-full h-full py-10 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-zinc-200"
      >
        <Technology />
        <Organisation />
        <Governance />
        <Assets />
        <Process />
        <Employees />
        <Customers />
        <Suppliers />
        <Training />
        <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
          <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
            <h1>Other Departments/Units</h1>
            {/*<Button*/}
            {/*    size="md"*/}
            {/*    variant="primary"*/}
            {/*    type="button"*/}
            {/*    className="w-[25%] m-0 bg-primary-500 rounded-lg"*/}
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
          </div>
        </div>

        <div className="flex w-full h-full space-x-20 px-10  items-end justify-end">
          <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              className="rounded-lg w-[40%] bg-primary-500"
              type="button"
          >
            Save & Continue
          </Button>
        </div>
      </form>
  );
};

export default KeyImpactForm;