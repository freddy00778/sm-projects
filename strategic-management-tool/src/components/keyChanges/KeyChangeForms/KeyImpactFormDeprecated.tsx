import {useEffect, useState} from "react";
import InputField from "../../InputField";
import DisplayValuesComponent from "../../DisplayValuesComponent";
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
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {departmentActions} from "../../../_store/department.slice";
import Loader from "../../Loader";
import {barrierActions} from "../../../_store/barriers.slice";
import {useParams} from "react-router-dom";

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
  content: 120,
};

const defaultDepartment: Department = {
  text: "How the change adds value",
};

const KeyImpactForm: React.FC<KeyImpactFormProps> = ({ onChange }) => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.keyImpact)
  const barriers = useSelector(state => state.barrier)
  const options = [{name: "Fixed", value: "fixed"}, {name: "Moveable", value: "moveable"}, {
    name: "Infrastructure",
    value: "infrastructure"
  }];
  const processOptions = [{name: "Fixed", value: "fixed"}, {
    name: "Moveable",
    value: "moveable"
  }, {name: "Infrastructure", value: "infrastructure"}];
  const [assetType, setAssetType] = useState(options[0]); // Assuming you have the options array in this component
  const [division, setDivision] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [displayValues1, setDisplayValues1] = useState<string[]>([]);
  const [displayValues2, setDisplayValues2] = useState<string[]>([]);
  const params = useParams()
  const keyChangeId = params["*"]

  const KeyImpactForm: React.FC<KeyImpactFormProps> = () => {
    const [departments, setDepartments] = useState<Department[]>([
      defaultDepartment,
    ]);

    const handleInputChange1 = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputValue1(e.target.value);
      onChange?.(e);
    };

    const handleKeyPress1 = (value: string) => {
      setDisplayValues1([...displayValues1, value]);
      dispatch(barrierActions.createBarrier({
        key_change_id: keyChangeId,
        obstacle: value
      }))

      setInputValue1("");
    };

    const handleDeleteValue1 = (index: number) => {
      const newValues = [...displayValues1];
      newValues.splice(index, 1);
      setDisplayValues1(newValues);
    };
    const handleInputChange2 = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputValue2(e.target.value);
      onChange?.(e);
    };

    const handleKeyPress2 = (value: string) => {
      setDisplayValues2([...displayValues2, value]);
      setInputValue2("");
    };

    const handleDeleteValue2 = (index: number) => {
      const newValues = [...displayValues2];
      newValues.splice(index, 1);
      setDisplayValues2(newValues);
    };


    const addDepartment = () => {
      setDepartments([...departments, defaultDepartment]);
    };

    useEffect(() => {
      dispatch(departmentActions.getDepartments())
    }, [])

    console.log("Barriers", barriers?.isLoading)

    return (
        <>
          {isLoading || barriers?.isLoading && <Loader/>}
          <form
              className="flex flex-col w-full h-full py-10 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-zinc-200"
          >
            <Technology/>
            <Organisation/>
            <Governance/>
            <Assets/>
            <Process/>
            <Employees/>
            <Customers/>
            <Suppliers/>
            <Training/>
            <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
              <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
                <h1>Other Departments/Units</h1>
                <Button
                    size="md"
                    variant="primary"
                    onClick={addDepartment}
                    type="submit"
                    className="w-[25%] m-0 bg-primary-500 rounded-lg"
                >
                  Add
                </Button>
              </div>
              <div
                  className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
                <DynamicFieldSet
                    data={departments}
                    setData={setDepartments}
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
          </form>

        </>
    );
  };
}

export default KeyImpactForm;
