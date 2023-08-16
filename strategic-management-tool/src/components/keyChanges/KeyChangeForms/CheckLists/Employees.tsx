import {ChangeEvent, FC, useEffect, useState} from "react";
import { CustomCheckbox } from "../../../CustomCheckBox";
import DynamicFieldSet from "../../../DynamicFieldSet";
import Button from "../../../Button";
import CustomModal from "../../../CustomModal";
import InputField from "../../../InputField";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {keyImpactActions} from "../../../../_store/keyImpact.slice";
import Loader from "../../../Loader";

interface CheckboxState {
  [key: string]: boolean;
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
}

interface EmployeeData {
  option: string;
  reason: string;
  divisions: Division[];
}

const Employees: FC = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const keyChangeId = params["*"]
  const { isLoading, keyImpacts } = useSelector(state => state.keyImpact)
  const [reason, setReason] = useState<Record<string, string>>({});
  const [sponsor, setSponsor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [divisions, setDivisions] = useState<Division[]>([defaultDivision]);
  const options = [
    "Knowledge / Skills",
    "Behavior",
    "Emotions",
    "Networks",
    "Workspace",
    "Ergonomics",
    "Health & Safety",
  ];

  console.log("Key Impacts data", keyImpacts)

  const defaultCheckboxState: CheckboxState = {};
  keyImpacts?.data[0]?.employees.data.forEach(item => {
    defaultCheckboxState[item.option] = true
  })

  const defaultReasonState: Record<string, string> = {};
  keyImpacts?.data[0]?.employees.data.forEach(item => {
    defaultReasonState[item.option] = item.reason;
  })

  const initializeCheckboxState = (): CheckboxState => {
    const initialState: CheckboxState = {}
    options.forEach(option => initialState[option] = false)
    keyImpacts?.data[0]?.employees.data.forEach(item => {
      if (initialState[item.option] !== undefined) {
        initialState[item.option] = true
      }
    })
    return initialState
  };
  const [state, setState] = useState<CheckboxState>(initializeCheckboxState());

  useEffect(() => {
    if (keyImpacts && keyImpacts.data && keyImpacts.data[0] && keyImpacts.data[0].employees) {
      initializeStates(keyImpacts.data[0].employees.data);
    }
  }, [keyImpacts]);

  const initializeStates = (employeeData: EmployeeData[]) => {
    const initialCheckboxState: CheckboxState = {};
    const initialReasonState: Record<string, string> = {}

    employeeData.forEach(item => {
      initialCheckboxState[item.option] = true
      initialReasonState[item.option] = item.reason
    });

    setState(initialCheckboxState);
    setReason(initialReasonState);
    setDivisions(employeeData[0]?.divisions || []);
  }
  const handleCheckboxChange =
    (option: string) => (e: ChangeEvent<HTMLInputElement>) => {
      // If checkbox is checked
      if (e.target.checked) {
        setState((prevState) => ({ ...prevState, [option]: true })); // Check the checkbox
        setSelectedOption(option); // Set the selected option
        setIsModalOpen(true); // Open the modal
      } else {
        setState((prevState) => ({ ...prevState, [option]: false })); // Uncheck the checkbox
      }
    };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const addDivision = () => {
    setDivisions([...divisions, defaultDivision]);
  };

  const saveEmployees = () => {
    // 1. Gather checkbox states
    const selectedOptions = Object.entries(state)
        .filter(([_, isChecked]) => isChecked)
        .map(([option, _]) => ({
          option,
          // 2. Collect reasons for each checkbox selected
          reason: reason[option],
          // 3. Get all divisions added
          divisions,
        }));

    // Construct the payload for the API
    const apiPayload = {
      organisation: selectedOptions,
    };

    console.log(apiPayload); // This will show the payload in console, remove after checking

    dispatch(keyImpactActions.createKeyImpact({
      key_change_id: keyChangeId,
      employees: {
        data: selectedOptions,
      }
    })).then(() => {
      closeModal()
    })

    closeModal();
  }

  return (
    <div className="flex flex-col w-full px-10 py-10  space-y-10  ">
      {isLoading && <Loader/>}

      <div className="w-full flex items-center border-b border-b-border py-2">
        <h1 className="text-[20px]">Employees</h1>
      </div>
      <div className="flex flex-row flex-wrap gap-4 w-full  ">
        {options.map((option, index) => (
          <CustomCheckbox
            key={index}
            id={`exampleCheckbox3${index}`}
            label={option}
            checked={state[option]}
            onChange={handleCheckboxChange(option)}
          />
        ))}
      </div>

      <div>
        <CustomModal isOpen={isModalOpen} size="md" onClose={closeModal}>
          <h1 className=" text-primary-500">Add Reason</h1>
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
            <div className="flex flex-col w-full  py-4  space-y-6  ">
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
                onClick={saveEmployees}
                type="submit"
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

export default Employees;
