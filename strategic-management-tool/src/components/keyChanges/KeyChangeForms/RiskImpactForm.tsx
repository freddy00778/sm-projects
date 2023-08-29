// @ts-nocheck

import InputDropdown from "../../InputDropdown";
import InputField from "../../InputField";
import DisplayValuesComponent from "../../DisplayValuesComponent";
import {useEffect, useState} from "react";
import Button from "../../Button";
import {useDispatch, useSelector} from "react-redux";
import {riskRatingActions} from "../../../_store/riskRating.slice";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Loader from "../../Loader";

interface RiskImpactFormProps {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const RiskImpactForm: React.FC<RiskImpactFormProps> = ({ onChange }) => {
  const {riskRatings, isLoading} = useSelector(state => state.riskRating)
  const {user} = useSelector(state => state.auth)
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch()
  const params = useParams()
  const keyChangeId = params["*"]
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const options1 = [ {name: "High Risk", value: "high-risk"},  {name: "Significant Risk",value:"significant-risk"},{name:"Moderate Risk", value:"moderate-risk"}];
  const options2 = [
    {name: "Severe Impact", value: "severe-impact"},
    {name: "Significant Impact", value: "significant-impact"},
    {name: "Moderate Impact", value: "moderate-impact"},
    {name: "Minor Impact", value: "minor-impact"},
    {name: "Negligible Impact", value: "negligible-impact"}
  ];
  const options = [ {name: "Key Change 1", value: "key-change-1"}, {name: "Key Change 2", value:"key-change-2"}, {name: "Key Change 3", value: "key-change-3"}];
  const options3 = [
    {name: "Very Likely", value: "very-likely"},
    {name: "Likely", value: "likely"},
    {name: "Possible", value: "possible"},
    {name : "Unlikely", value: "unlikely"},
    {name: "Very Unlikely", value: "very-unlikely"}
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOption1, setSelectedOption1] = useState(options[0]);
  const [selectedOption2, setSelectedOption2] = useState(options[0]);
  const [selectedOption3, setSelectedOption3] = useState(options[0]);
  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  };
  const handleOptionSelected1 = (option1: any) => {
    setSelectedOption1(option1);
  };
  const handleOptionSelected2 = (option2: any) => {
    setSelectedOption2(option2);
  };
  const handleOptionSelected3 = (option3: any) => {
    setSelectedOption3(option3);
  };
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


  console.log(`${selectedOption?.name} - ${selectedOption1?.name} - ${selectedOption2?.name} - ${selectedOption3?.name}`)
  console.log(`${displayValues}`)


  const handleErrorToast = (errorMessage: string) => {
    toast.error("Error: " + errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  };

  const handleSave = () => {
    if (!selectedOption1 && !selectedOption2 && !selectedOption3){
      handleErrorToast("All fields are required!")
      return
    }

    dispatch(riskRatingActions.createRiskRating({
      risk_category: selectedOption1?.value,
      risk_severity: selectedOption2?.value,
      risk_occurrence_probability: selectedOption3?.value,
      mitigation_plan: inputValue,
      key_change_id: keyChangeId,
      project_id: user?.project_id
    }))
  }

  useEffect(() => {
    dispatch(riskRatingActions.getRiskRatingByKeyId({id: keyChangeId, project_id: user?.project_id}))
  },[keyChangeId])

  useEffect(() => {
    const riskRatingObject = riskRatings?.data?.[0]
    console.log("risk ratings",riskRatingObject)
    setSelectedOption1(riskRatingObject?.risk_category)
    setSelectedOption2(riskRatingObject?.risk_severity)
    setSelectedOption3(riskRatingObject?.risk_occurrence_probability)
    setInputValue(riskRatingObject?.mitigation_plan)

    console.log("Input value", inputValue)
  },[keyChangeId, dispatch])
  return (
      <>
      <ToastContainer />
        {isLoading && <Loader/>}
    <form
      action="submit"
      className="flex flex-col w-full h-full px-10  overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-200"
    >
      <div className="flex items-center w-full justify-between">
        <h1 className="w-3/4">Select Key Change Risk</h1>
        <InputDropdown
          id="dropdown"
          label={`${selectedOption}`}
          options={options}
          onOptionSelected={handleOptionSelected}
          className=" w-1/4 m-0"
        />
      </div>
      <InputDropdown
        id="dropdown"
        header="Risk Category"
        defaultOption={selectedOption1}
        label={`${selectedOption1}`}
        options={options1}
        onOptionSelected={handleOptionSelected1}
        className=" w-full m-0"
      />
      <InputDropdown
        id="dropdown"
        header="How severe is the risk?"
        defaultOption={selectedOption2}
        label={`${selectedOption2}`}
        options={options2}
        onOptionSelected={handleOptionSelected2}
        className=" w-full m-0"
      />
      <InputDropdown
        id="dropdown"
        header="What is the likelihood or Probability that the risk may happen?"
        defaultOption={selectedOption3}
        label={`${selectedOption3}`}
        options={options3}
        onOptionSelected={handleOptionSelected3}
        className=" w-full m-0"
      />
      <div className="flex flex-col w-full  py-10  space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-0">
          <h1 className="text-[20px]">
            Is there a risk associated with this Key Change?
          </h1>
        </div>
        <div className="flex flex-col w-full  ">
          <InputField
            defaultValue={"ksksk"}
            id="mitigation_plan"
            label="(Risk that need a mitigation plan or needs to be monitored)"
            value={inputValue}
            onChange={handleInputChange}
            type="textarea"
            placeholder="Describe the risk briefly"
            required
            className="w-full h-[200px] "
            characterLimit={240}
          />
          {/*<div className="mt-20">*/}
          {/*  <DisplayValuesComponent*/}
          {/*    displayValues={displayValues}*/}
          {/*    handleDeleteValue={handleDeleteValue}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="mt-10 flex w-full h-full space-x-20   items-end justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          className="rounded-lg w-[40%] bg-primary-500"
          type="button"
        >
          Save
        </Button>
      </div>
    </form>

        {/*<div className="mt-10 pr-10 flex w-full h-full space-x-20   items-end justify-end">*/}
        {/*  <Button*/}
        {/*      variant="primary"*/}
        {/*      size="lg"*/}
        {/*      onClick={handleSave}*/}
        {/*      className="rounded-lg w-[40%] bg-primary-500"*/}
        {/*      type="button"*/}
        {/*  >*/}
        {/*    Save*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </>

  );
};

export default RiskImpactForm;
