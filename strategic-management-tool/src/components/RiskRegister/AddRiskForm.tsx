
import {useEffect, useState} from "react";
import AddRiskModal from "./AddRiskModal";
import { DataType } from "../../../types";
import dots from "../../assets/images/dots.svg";
import view from "../../assets/images/view.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/delete.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {toast, ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {riskActions} from "../../_store/risks.slice";
import React from "react";
import Loader from "../Loader";

interface AddRiskFormProps {
  isOpen: boolean;
  onClose: () => void;
  addData: (newData: DataType) => void;
}

const AddRiskForm: React.FC<AddRiskFormProps> = ({
  isOpen,
  onClose,
  addData,
}) => {
  const dispatch = useDispatch()
  //@ts-ignore
  const {user} = useSelector( state => state.auth)
  //@ts-ignore
  const {risks, isLoading} = useSelector(state => state.risk)
  const params = useParams()
  const keyChangeId = params["*"]
  const [risk, setRisk] = useState("");
  const [owner, setOwner] = useState("");
  const [action, setAction] = useState("");
  const [person, setPerson] = useState("");
  const [category, setCategory] = useState("");
  const [assessment, setAssessment] = useState("");
  const [assessment1, setAssessment1] = useState("");
  const [dateLogged, setDateLogged] = useState("");
  const [reportedDate, setReportedDate] = useState("");
  //@ts-ignore
  const [dataEntries, setDataEntries] = useState<DataType[]>([]);

  console.log("risks", risks)

  // const fetchRisks = () => {
  //   dispatch(riskActions.getAll({key_change_id: keyChangeId, project_id: user?.project_id}))
  // }
  //
  // useEffect(() => {
  //   fetchRisks()
  // },[])

  useEffect(() => {
    // setDataEntries(issues?.data)
    console.log("risks from data", risks)
    console.log("risks from data", risks?.length)

    risks?.data?.map(() => {
      const newData: DataType = {
        risk,
        owner,
        action,
        person,
        assessment1,
        dateLogged,
        reportedDate,
      }

      addData(newData);
    })


  },[risks])

  const handleAddData = () => {
    const newData: DataType = {
      risk,
      owner,
      action,
      person,
      category,
      assessment,
      assessment1,
      dateLogged,
      reportedDate,
    };
    addData(newData);

    console.log("Risk data", newData)

    //@ts-ignore
    // dispatch(riskActions.createRisk({risk: risk, responsible_manager: owner, date_reported: reportedDate, mitigating_actions: action, assigned_mitigator: person, project_id: user?.project_id, key_change_id: keyChangeId, risk_category: category, risk_assessment_value: assessment})).then((res) => {
    //   if (res?.payload?.message === "success"){
    //     handleSuccessToast()
    //     fetchRisks()
    //   }
    // })

    setDataEntries((prevDataEntries) => [...prevDataEntries, newData]);
    setRisk("");
    setOwner("");
    setAction("");
    setPerson("");
    setCategory("");
    setAssessment("");
    setAssessment1("");
    setDateLogged("");
    setReportedDate("");
  };
  //
  // const handleSuccessToast = () => {
  //   toast.success("Successfully added a risk!", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 3000, // Auto-close the toast after 3 seconds
  //   });
  // }

  const viewRisk = (id, data) => {
    dispatch(riskActions.setClickedRiskAction({
      type: "view",
      id: id,
      data
    }))
    // alert(`view ${id}`)
  }

  const editRisk = (id, data) => {
    dispatch(riskActions.setClickedRiskAction({
      type: "edit",
      id: id,
      data
    }))
  }

  const deleteRisk = (id,data) => {
    dispatch(riskActions.setClickedRiskAction({
      type: "delete",
      id: id,
      data
    }))
  }

  return (
    <div className=" h-full w-full max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 ">
      {isLoading &&  <Loader />}

      <ToastContainer />
      <AddRiskModal
        isOpen={isOpen}
        risk={risk}
        setRisk={setRisk}
        owner={owner}
        setOwner={setOwner}
        action={action}
        setAction={setAction}
        person={person}
        setPerson={setPerson}
        category={category}
        setCategory={setCategory}
        assessment={assessment}
        setAssessment={setAssessment}
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
        {risks?.data?.map((entry, index) => (
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
                    <DropdownMenu.Item
                        onClick={() => {
                          viewRisk(entry.id, entry)
                        }}
                        className="flex items-center justify-between space-x-6 py-1 px-2 hover:bg-primary-50 hover:text-primary-500 hover: rounded cursor-pointer">
                      <img src={view} alt="" width={16} />
                      <h1
                          className=" text-sm">View</h1>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={() => {
                          editRisk(entry.id, entry)
                        }}
                        className="flex items-center justify-between space-x-2 py-1 px-2 hover:bg-primary-50 hover:text-primary-500 hover:rounded cursor-pointer">
                      <img src={edit} alt="" width={13} />
                      <h1

                          className=" text-sm">Edit</h1>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={() => {
                          deleteRisk(entry.id, entry)
                        }}
                        className="flex items-center justify-between space-x-4 py-1 px-2 hover:bg-primary-50 hover:text-primary-500 hover:rounded cursor-pointer">
                      <img src={trash} alt="" width={16} />
                      <h1
                          className=" text-sm">Delete</h1>
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
              <p className="text-label text-sm">{entry.responsible_manager}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddRiskForm;
