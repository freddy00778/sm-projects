import InputField from "../../InputField";
import InputDropdown from "../../InputDropdown";
import Button from "../../Button";
import React, { useState } from "react";

import { DataType } from "../../../../types";
import {useDispatch, useSelector} from "react-redux";
import {noteActions} from "../../../_store/notes.slice";
import {useParams} from "react-router-dom";
import Loader from "../../Loader";

interface IssueNoteModalFormProps {
  assessment: string;
  setAssessment: React.Dispatch<React.SetStateAction<string>>;
  dateLogged: string;
  setDateLogged: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  // previousIssueOptions: any
  // previousRatingOptions: any
  // setPreviousIssue: any
  // setPreviousRating:any
  addData: (newData: DataType) => void;
  dataLength: number;
  onClose: () => void;
}

const IssueNoteModalForm: React.FC<IssueNoteModalFormProps> = ({
  assessment,
  setAssessment,
  dateLogged,
  setDateLogged,
  text,
  setText,
  // previousIssueOptions,
  // previousRatingOptions,
  // setPreviousIssue,
  // setPreviousRating,
  addData,
  dataLength,
  onClose,
}) => {
  const options = [
    {name: "Strategic Change", value: "strategic-change"},
    {name: "BAU Change", value: "bau-change"},
    {name: "Annual Corporate Initiative", value: "annual-corporate-initiative"},
  ];
  const options1 = [

    {name: "Strategic Change", value: "strategic-change"},
    {name: "BAU Change", value: "bau-change"},
    {name: "Annual Corporate Initiative", value: "annual-corporate-initiative"},
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const dispatch = useDispatch()
  const params = useParams()
  const keyChangeId = params["*"]
  const {isLoading} = useSelector(state => state.note)

  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  };
  const handleOptionSelected1 = (option1: any) => {
    setSelectedOption1(option1);
  };
  const handleSave = () => {
    const date = new Date(dateLogged); // Convert string to date
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    // addData({
    //   No: dataLength + 1,
    //   Type: selectedOption,
    //   Description: text,
    //   Date: formattedDate,
    //   "Logged By": assessment,
    // });

    // dispatch()

    dispatch(noteActions.createNote({
      details: text,
      previous_risk_severity: selectedOption?.value,
      previous_rating: selectedOption1?.value,
      risk_assessment_value: assessment,
      date_reported: dateLogged,
      key_change_id: keyChangeId
    })).then((res) => {
      if (res?.type?.includes("fulfilled")){
        dispatch(noteActions.getAll({key_change_id: keyChangeId}))
      }
    })

    setAssessment("");
    setDateLogged("");
    setText("");
    setSelectedOption(options[0]);
    setSelectedOption1(options1[0]); // Open the modal when button is clicked
    onClose();
  };
  return (
      <>

        {isLoading && <Loader/>}

    <form className="w-full h-full">
      <div className="flex flex-col w-full h-full  space-y-4 overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-zinc-200 ">
        <h1 className="text-primary-500 text-[18px]">Add Note</h1>
        <InputField
          id="note_details"
          label="Note Details"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="textarea"
          placeholder="Provide your note details"
          required
          className="w-full m-0 h-[320px] "
          characterLimit={120}
        />
        <div className="flex items-center w-full justify-between py-12 space-x-10">
          <InputDropdown
            id="dropdown"
            header="Previous Issue Severity"
            label={`${selectedOption}`}
            options={options}
            onOptionSelected={handleOptionSelected}
            className=" w-full m-0"
          />
          <InputDropdown
            id="dropdown"
            header="Previous Rating"
            label={`${selectedOption1}`}
            options={options1}
            onOptionSelected={handleOptionSelected1}
            className=" w-full m-0"
          />
        </div>
        <div className="flex items-center w-full justify-between py-12 space-x-10">
          <InputField
            id="email"
            label="Issue Assessment Value"
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
            type="text"
            placeholder="Enter the risk assessment value"
            required
            className="w-full m-0"
          />
          <InputField
            id="email"
            label="Date"
            value={dateLogged}
            onChange={(e) => setDateLogged(e.target.value)}
            type="datepicker"
            required
            className="w-full m-0"
          />
        </div>
        <div className="flex w-full items-end justify-end h-full">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            className="rounded-lg w-[30%] mt-6 bg-primary-500"
            type="button"
          >
            Add Note
          </Button>
        </div>
      </div>
    </form>
      </>
  );
};

export default IssueNoteModalForm;
