import InputField from "../InputField";
import InputDropdown from "../InputDropdown";
import Button from "../Button";
import { DataType } from "../../../types";
import {useEffect, useState} from "react";
import lesson from "../../assets/images/lessons-log.svg";
import cancel from "../../assets/images/cancel.svg";
import Table from "../Table";
import IssueNoteModal from "./IssueNote/IssueNoteModal";
import {decisionActions} from "../../_store/decisons.slice";
import {useDispatch, useSelector} from "react-redux";
import {noteActions} from "../../_store/notes.slice";
import {useParams} from "react-router-dom";

interface IssueModalFormProps {
  issue: string;
  setIssue: React.Dispatch<React.SetStateAction<string>>;
  owner: string;
  setOwner: React.Dispatch<React.SetStateAction<string>>;
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
  assessment1: string;
  setAssessment1: React.Dispatch<React.SetStateAction<string>>;
  dateLogged: string;
  setDateLogged: React.Dispatch<React.SetStateAction<string>>;
  reportedDate: string;
  setReportedDate: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
  onClose: () => void;
}
const IssueModalForm: React.FC<IssueModalFormProps> = ({
  issue,
  setIssue,
  owner,
  setOwner,
  action,
  setAction,
  person,
  setPerson,
  assessment1,
  setAssessment1,
  dateLogged,
  setDateLogged,
  reportedDate,
  setReportedDate,
  onClose,
  addData,
}) => {
  const options1 = [ {name: "No", value: false}, {name: "Yes", value: true}];
  const options2 = [
    {name: "Very High Impact", value:"very-high-impact"},
    {name: "High Impact", value: "high-impact"},
    {name: "Medium Impact", value:"medium-impact"},
    {name: "Low Impact", value: "low-impact"},
  ];
  const options3 = [
    {name: "Very High Impact", value:"very-high-impact"},
    {name: "High Impact", value: "high-impact"},
    {name: "Medium Impact", value:"medium-impact"},
    {name: "Low Impact", value: "low-impact"},
  ];
  const dispatch = useDispatch()
  const {notes} = useSelector(state => state.note)
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const [selectedOption3, setSelectedOption3] = useState(options3[0]);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [data1, setData1] = useState<DataType[]>([]);
  const params = useParams()
  const keyChangeId = params["*"]
  const addData1 = (newData: DataType) => {
    setData1((prevData) => [...prevData, newData]);

    console.log(`text - ${text}, previous issue ${selectedOption1?.value} previous rating - ${selectedOption2?.value} assessment - ${assessment1} - date logged ${dateLogged}`)
  };

  const openModal = () => {
    setSecondModalOpen(true); // Open the modal when button is clicked
  }

  const handleSave = () => {
    addData({
      issue: issue,
      owner: owner,
      action: action,
      person: person,
      reportedDate: reportedDate,
      options1: options1,
      options2: options2,
      options3: options3,
    });
    onClose();
  };
  const handleOptionSelected1 = (option1: any) => {
    setSelectedOption1(option1);
  };
  const handleOptionSelected2 = (option2: any) => {
    setSelectedOption2(option2);
  };
  const handleOptionSelected3 = (option3: any) => {
    setSelectedOption3(option3);
  }

  useEffect(() => {
      // dispatch(noteActions.getAll({key_change_id: keyChangeId}))
  },[])

  return (
    <div className="flex flex-col space-y-16 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
      <InputField
        id="date_reported"
        label="Date Reported"
        value={reportedDate}
        onChange={(e) => setReportedDate(e.target.value)}
        type="datepicker"
        className="w-full m-0"
      />
      <InputField
        id="risk"
        label="Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        type="textarea"
        placeholder="Describe the issue"
        required
        className="w-full m-0 h-44"
      />
      <InputField
        id="responsible_manager"
        label="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        type="text"
        placeholder="Responsible Manager"
        required
        className="w-full m-0"
      />
      <InputField
        id="mitigating_actions"
        label="Solution / Action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        type="textarea"
        placeholder="Describe the solution or action required to resolve the issue"
        required
        className="w-full m-0 h-44"
      />
      <InputDropdown
        id="mitigating_actions_captured"
        header="Actions captured in Change Management / Project Plan"
        label={`${selectedOption1}`}
        options={options1}
        onOptionSelected={handleOptionSelected1}
        className=" w-full m-0"
      />
      <InputField
        id="assigned_mitigator"
        label="Responsible person to take action"
        value={person}
        onChange={(e) => setPerson(e.target.value)}
        type="text"
        placeholder="Responsible person’s name"
        required
        className="w-full m-0"
      />
      <div className="flex items-center w-full justify-between space-x-10">
        <InputField
          id="date"
          label="Date"
          value={reportedDate}
          onChange={(e) => setReportedDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
        <InputDropdown
          id="dropdown"
          header="Impact Level"
          label={`${selectedOption2}`}
          options={options2}
          onOptionSelected={handleOptionSelected2}
          className=" w-full m-0"
        />
      </div>
      <div className="flex items-center w-full justify-between space-x-10">
        <InputField
          id="date"
          label="Date"
          value={reportedDate}
          onChange={(e) => setReportedDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
        <InputDropdown
          id="dropdown"
          header="Previous Level of Impact"
          label={`${selectedOption3}`}
          options={options3}
          onOptionSelected={handleOptionSelected3}
          className=" w-full m-0"
        />
      </div>
      <div className="flex w-full py-4 border-b border-border border-opacity-20 items-center justify-between ">
        <h1>Notes</h1>

        <Button
          variant="primary"
          size="md"
          onClick={openModal}
          className="rounded-lg w-[30%] bg-primary-500"
          type="button"
        >
          Add Notes
        </Button>
      </div>
      <div className="relative">
        <div className="flex flex-col w-full  h-[100%]">
          <Table
            headings={[
                {alias: "No", name: "No"},
                {alias: "Date", name: "date_reported"},
                {alias: "Notes", name: "details"},
                {alias: "Previous RS", name: "previous_risk_severity"},
                {alias: "Previous Rating", name: "previous_rating"},
                {alias: "Risk Assessment", name: "risk_assessment_value"},
                {alias: "Date", name: "created_at"},
            ]}
            data={notes?.data}
            //addData={addData}
            children={
              <div className=" space-y-2">
                <img src={lesson} alt="lessons" width={140} />
                <h1 className="text-[18px]">No Notes</h1>
              </div>
            }
          />
        </div>
      </div>
      <div>
        <IssueNoteModal
          isOpen={secondModalOpen}
          onClose={() => setSecondModalOpen(false)}
          className=" absolute "
          cancel={cancel}
          width={14}
          assessment={assessment1}
          setAssessment={setAssessment1}
          dateLogged={dateLogged}
          setDateLogged={setDateLogged}
          text={text}
          setText={setText}
          addData={addData1}
          dataLength={data1.length}
        />
      </div>
      <div className="flex w-full h-[20%] items-end justify-end ">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          className="rounded-lg w-[30%] mt-6 bg-primary-500"
          type="button"
        >
          Add Issue
        </Button>
      </div>
    </div>
  );
};

export default IssueModalForm;
