// @ts-nocheck

import {ChangeEvent, FC, useEffect, useState} from "react";
import { CustomCheckbox } from "../../../CustomCheckBox";
import Button from "../../../Button";
import DynamicFieldSet from "../../../DynamicFieldSet";
import CustomModal from "../../../CustomModal";
import cancel from "../../../../assets/images/cancel.svg";
import InputField from "../../../InputField";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {keyImpactActions} from "../../../../_store/keyImpact.slice";
import Loader from "../../../Loader";
import {departmentActions} from "../../../../_store/department.slice";
import {keyImpactDepartmentActions} from "../../../../_store/keyImpactDepartment.slice";

interface CheckboxState {
  [key: string]: boolean;
}

interface Division {
  text: string;
  content: string;
}

const defaultStructure: Record<string, "number" | "text" | "password" | "email" | "textarea" | "search" | "datepicker"> = {
  content: "text",
};

const characterLimits: Record<string, number> = {
  content: 120,
};

interface TechnologyData {
  option: string;
  reason: string;
  divisions: Division[];
}

const Technology: FC = () => {

  const options = [
    "Availability", "User Friendliness", "Complexity",
    "Compatibility", "Data requirements", "Time",
    "Competencies", "Hardware requirements",
    "Software requirements", "Installation maintenance",
  ];

  const params = useParams()
  const keyChangeId = params["*"]
  const dispatch = useDispatch()
  const { isLoading, keyImpacts } = useSelector(state => state.keyImpact)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [divisions, setDivisions] = useState<Division[]>((keyImpacts?.data[0]?.technology.divisions) || [])

  console.log("Key Impacts data", keyImpacts)

  useEffect(() => {
    dispatch(keyImpactDepartmentActions.getKeyImpactDepartmentByKeyChangeId({id: keyChangeId}))
  },[keyChangeId, dispatch])

  const defaultCheckboxState: CheckboxState = {};
  keyImpacts?.data[0]?.technology.data.forEach(item => {
    defaultCheckboxState[item.option] = true
  })

  const defaultReasonState: Record<string, string> = {};
  keyImpacts?.data[0]?.technology.data.forEach(item => {
    defaultReasonState[item.option] = item.reason;
  });

  const [reason, setReason] = useState<Record<string, string>>(defaultReasonState)
  const initializeCheckboxState = (): CheckboxState => {
    const initialState: CheckboxState = {}
    options.forEach(option => initialState[option] = false)
    keyImpacts?.data[0]?.technology.data.forEach(item => {
      if (initialState[item.option] !== undefined) {
        initialState[item.option] = true
      }
    })
    return initialState
  };
  const [state, setState] = useState<CheckboxState>(initializeCheckboxState());

  useEffect(() => {
    if (keyImpacts && keyImpacts.data && keyImpacts.data[0] && keyImpacts.data[0].technology) {
      initializeStates(keyImpacts.data[0].technology.data);
    }
  }, [keyImpacts]);

  const initializeStates = (technologyData: TechnologyData[]) => {
    const initialCheckboxState: CheckboxState = {};
    const initialReasonState: Record<string, string> = {};

    technologyData.forEach(item => {
      initialCheckboxState[item.option] = true;
      initialReasonState[item.option] = item.reason;
    });

    setState(initialCheckboxState);
    setReason(initialReasonState);
    setDivisions(technologyData[0]?.divisions || []);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleCheckboxChange =
      (option: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({ ...prevState, [option]: e.target.checked }));
        setSelectedOption(option);
        setIsModalOpen(true);
      }

  const addDivision = () => {
    setDivisions(prev => [...prev, { text: "How the change adds value", content: "" }]);
  }

  const prepareDataForAPI = () => {
    const selectedOptions = Object.entries(state)
        .filter(([_, isChecked]) => isChecked)
        .map(([option, _]) => ({
          option,
          reason: reason[option],
          divisions,
        }));
    return selectedOptions
  }

  const saveTechnologyData = () => {
    const data = prepareDataForAPI();
    dispatch(keyImpactActions.createKeyImpact({
      key_change_id: keyChangeId,
      technology: { data }
    })).then(() => {
      closeModal();
    })
  }

  return (
      <div className="flex flex-col w-full px-10 py-10 space-y-10">
        {isLoading && <Loader />}

        <div className="w-full flex items-center border-b border-b-border py-2">
          <h1 className="text-[20px]">Technology</h1>
        </div>
        <div className="flex flex-row flex-wrap gap-4 w-full cursor-pointer">
          {options.map((option, index) => (
              <CustomCheckbox
                  key={index}
                  id={`exampleCheckbox${index}`}
                  label={option}
                  checked={state[option]}
                  onChange={handleCheckboxChange(option)}
              />
          ))}
        </div>

        <div>
          <CustomModal
              isOpen={isModalOpen}
              size="md"
              onClose={closeModal}
              cancel={cancel}
          >
            <h1 className="text-primary-500">Add Reason</h1>
            <div className="py-8 space-y-4">
              <InputField
                  id="reasonInput"
                  label="Reason"
                  value={reason[selectedOption] || ''}
                  onChange={(e) => setReason((prev) => ({ ...prev, [selectedOption]: e.target.value }))}
                  type="text"
                  placeholder="Enter the reason for selecting the impact"
                  required
                  className="w-full m-0"
              />

              <div className="flex flex-col w-full py-4 space-y-6">
                <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
                  <h1>Division/Department/Unit</h1>
                  <Button
                      size="md"
                      variant="primary"
                      onClick={addDivision}
                      type="button"
                      className="w-[25%] m-0 bg-primary-500 rounded-lg"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-col h-full w-full space-y-8 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
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
              <div className="flex items-center w-full justify-end">
                <Button
                    size="md"
                    variant="primary"
                    onClick={saveTechnologyData}
                    type="button"
                    className="w-[50%] m-0 bg-primary-500 rounded-lg"
                >
                  Save
                </Button>
              </div>
            </div>
          </CustomModal>
        </div>
      </div>
  );
};

export default Technology;
