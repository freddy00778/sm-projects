import {useEffect, useState} from "react";
import IssueModal from "./IssueModal";
import { DataType } from "../../../types";
import dots from "../../assets/images/dots.svg";
import view from "../../assets/images/view.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/delete.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useDispatch, useSelector} from "react-redux";
import {issueActions} from "../../_store/issues.slice";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Loader from "../Loader";

interface IssueFormProps {
  isOpen: boolean;
  onClose: () => void;
  addData: (newData: DataType) => void;
}

interface IssueData {
  date_reported: string
  risk: string
  responsible_manager: string
  mitigating_actions: string
  mitigating_actions_captured: string
  assigned_mitigator: string
  risk_category: string
  category_value: string
  impact_level: string
  impact_level_risk_category: string
  risk_assessment_value: string
  note_id: string
  key_change_id: string
  project_id: string
}

const IssueForm: React.FC<IssueFormProps> = ({ isOpen, onClose, addData }) => {
  const dispatch = useDispatch()
  const {issues,isLoading} = useSelector( state => state.issue)
  console.log("issue register", issues)

  const {user} = useSelector( state => state.auth)
  const [formIssues, setFormIssues] = useState([])
  const params = useParams()
  const keyChangeId = params["*"]
  const [issue, setIssue] = useState();
  const [owner, setOwner] = useState("");
  const [action, setAction] = useState("");
  const [person, setPerson] = useState("");
  const [assessment1, setAssessment1] = useState("");
  const [dateLogged, setDateLogged] = useState("");
  const [reportedDate, setReportedDate] = useState("");
  const [dataEntries, setDataEntries] = useState<DataType[]>([]);

  useEffect(() => {
    // setDataEntries(issues?.data)
    console.log("issues from data", issues)

    issues?.data?.map(() => {
      const newData: DataType = {
        issue,
        owner,
        action,
        person,
        assessment1,
        dateLogged,
        reportedDate,
      }

      addData(newData);
    })


  },[issues])

  const handleAddData = () => {
    const newData: DataType = {
      issue,
      owner,
      action,
      person,
      assessment1,
      dateLogged,
      reportedDate,
    }

    addData(newData);

    console.log("Data from issue form", newData)

    dispatch(issueActions.createIssue({
      risk: issue,
      responsible_manager: owner,
      date_reported: reportedDate,
      mitigating_actions: action,
      assigned_mitigator: person,
      project_id: user?.project_id,
      key_change_id: keyChangeId
    })).then((res) => {
      if (res?.payload?.message === "success"){
        handleSuccessToast()
        dispatch(issueActions.getAll({key_change_id: keyChangeId}))
      }
    })

    setDataEntries((prevDataEntries) => [...prevDataEntries, newData]);
    setIssue("");
    setOwner("");
    setAction("");
    setPerson("");
    setAssessment1("");
    setDateLogged("");
    setReportedDate("");
  };

  const handleSuccessToast = () => {
    toast.success("Successfully added an issue!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  };

  return (
    <div className=" h-full w-full max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 ">
      <ToastContainer />
      {isLoading && <Loader/> }

      <IssueModal
        isOpen={isOpen}
        issue={issue}
        setIssue={setIssue}
        owner={owner}
        setOwner={setOwner}
        action={action}
        setAction={setAction}
        person={person}
        setPerson={setPerson}
        assessment1={assessment1}
        setAssessment1={setAssessment1}
        dateLogged={dateLogged}
        setDateLogged={setDateLogged}
        reportedDate={reportedDate}
        setReportedDate={setReportedDate}
        onClose={onClose}
        addData={handleAddData}
        className=" absolute" // Call the handleAddData function
      />
      <div className="flex flex-wrap gap-7  py-2  ">
        {issues?.data?.map((entry, index) => (
          <div
            key={index}
            className=" shadow-md w-64 py-4 px-4 rounded-lg space-y-2"
          >
            <div className="flex w-full items-center justify-between py-2">
              <h1 className=" text-lg">{entry.risk}</h1>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="border border-border px-1 py-1 rounded-md">
                    <img src={dots} alt="" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className=" shadow-md bg-white  space-y-3 px-2 py-4 rounded-lg"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item className="flex items-center justify-between space-x-6 py-1 px-2 hover:bg-primary-50 hover:text-primary-500 hover: rounded cursor-pointer">
                      <img src={view} alt="" width={16} />
                      <h1 className=" text-sm">View</h1>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="flex items-center justify-between space-x-2 py-1 px-2 hover:bg-primary-50 hover:text-primary-500 hover:rounded cursor-pointer">
                      <img src={edit} alt="" width={13} />
                      <h1 className=" text-sm">Edit</h1>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="flex items-center justify-between space-x-4 py-1 px-2 hover:bg-primary-50 hover:text-primary-500 hover:rounded cursor-pointer">
                      <img src={trash} alt="" width={16} />
                      <h1 className=" text-sm">Delete</h1>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="space-y-1">
              <p className="text-primary-400 text-xs font-medium">
                Date Reported
              </p>
              <p className=" text-label text-sm">{entry.date_reported}</p>
            </div>
            <div className=" space-y-1">
              <p className="text-primary-400 text-xs font-medium">Owner</p>
              <p className="text-label text-sm">{entry.assigned_mitigator}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueForm;
