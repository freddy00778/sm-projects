import {ChangeEvent, FC, useEffect, useState} from "react";
import { CustomCheckbox } from "../../../CustomCheckBox";
import DynamicFieldSet from "../../../DynamicFieldSet";
import Button from "../../../Button";
import CustomModal from "../../../CustomModal";
import InputField from "../../../InputField";
import {useDispatch, useSelector} from "react-redux";
import {keyImpactActions} from "../../../../_store/keyImpact.slice";
import {useParams} from "react-router-dom";
import Loader from "../../../Loader";

interface CheckboxState {
  [key: string]: boolean;
}

interface Division {
  text: string;
}

const defaultStructure: Record<string, "number" | "text" | "password" | "email" | "textarea" | "search" | "datepicker"> = {
  content: "text",
};

const characterLimits: Record<string, number> = {
  content: 120,
};

const defaultDivision: Division = {
  text: "How the change adds value",
}

interface OrganisationData {
  option: string;
  reason: string;
  divisions: Division[];
}

const Organisation: FC = () => {
  const { isLoading, keyImpacts } = useSelector(state => state.keyImpact)
  // const [reason, setReason] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [divisions, setDivisions] = useState<Division[]>([defaultDivision]);
  const dispatch = useDispatch();
  const params = useParams()
  const keyChangeId = params["*"]
  const options = [
    "Strategy",
    "Structure",
    "Headcount",
    "Leadership style",
    "Leadership decision making",
    "Role Definition",
    "Job profiles",
    "Internal political issues",
  ];
  // const [state, setState] = useState<CheckboxState>(options.reduce((acc, curr) => ({ ...acc, [curr]: false }), {}))

  console.log("Key Impacts data", keyImpacts)

  const defaultCheckboxState: CheckboxState = {};
  keyImpacts?.data[0]?.organisation.data.forEach(item => {
    defaultCheckboxState[item.option] = true
  })

  const defaultReasonState: Record<string, string> = {};
  keyImpacts?.data[0]?.organisation.data.forEach(item => {
    defaultReasonState[item.option] = item.reason;
  })

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
    if (keyImpacts && keyImpacts.data && keyImpacts.data[0] && keyImpacts.data[0].organisation) {
      initializeStates(keyImpacts.data[0].organisation.data);
    }
  }, [keyImpacts]);

  const initializeStates = (technologyData: OrganisationData[]) => {
    const initialCheckboxState: CheckboxState = {};
    const initialReasonState: Record<string, string> = {}

    technologyData.forEach(item => {
      initialCheckboxState[item.option] = true
      initialReasonState[item.option] = item.reason
    });

    setState(initialCheckboxState);
    setReason(initialReasonState);
    setDivisions(technologyData[0]?.divisions || []);
  }

  const handleCheckboxChange =
      (option: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, [option]: e.target.checked }));
        setSelectedOption(option);
        if (e.target.checked) {
          setIsModalOpen(true);
        }
      }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addDivision = () => {
    setDivisions([...divisions, defaultDivision]);
  };

  const saveOrganisationData = () => {
    // 1. Gather checkbox states
    const selectedOptions = Object.entries(state)
        .filter(([_, isChecked]) => isChecked)
        .map(([option, _]) => ({
          option,
          // 2. Collect reasons for each checkbox selected
          reason: reason[option],
          divisions,
        }));

    // Construct the payload for the API
    const apiPayload = {
      organisation: selectedOptions,
    };

    console.log(apiPayload); // This will show the payload in console, remove after checking

    dispatch(keyImpactActions.createKeyImpact({
      key_change_id: keyChangeId,
      organisation: {
        data: selectedOptions,
      }
    })).then(() => {
      closeModal()
    })

    // If you're using Redux, dispatch this payload to the store or send to API
    // dispatch(yourReduxAction(apiPayload));
    // Or if you're sending to an API:
    // apiService.sendOrganisationData(apiPayload);

    closeModal();
  }
  return (
      <div className="flex flex-col w-full px-10 py-10 space-y-10">
        {isLoading && <Loader />}
        <div className="w-full flex items-center border-b border-b-border py-2">
          <h1 className="text-[20px]">Organisation</h1>
        </div>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          {options.map((option, index) => (
              <CustomCheckbox
                  key={index}
                  id={`exampleCheckbox1${index}`}
                  label={option}
                  checked={state[option]}
                  onChange={handleCheckboxChange(option)}
              />
          ))}
        </div>
        <div>
          <CustomModal isOpen={isModalOpen} size="md" onClose={closeModal}>
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
                    onClick={saveOrganisationData}
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

export default Organisation;
