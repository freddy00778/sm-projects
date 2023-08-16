import { FC } from "react";
import CustomModal from "../CustomModal";
import AddRiskModalForm from "./AddRiskModalForm";
import { DataType } from "../../../types";

interface AddRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  cancel?: string;
  width?: number;
  risk: string;
  setRisk: React.Dispatch<React.SetStateAction<string>>;
  owner: string;
  setOwner: React.Dispatch<React.SetStateAction<string>>;
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  assessment: string;
  setAssessment: React.Dispatch<React.SetStateAction<string>>;
  assessment1: string;
  setAssessment1: React.Dispatch<React.SetStateAction<string>>;
  dateLogged: string;
  setDateLogged: React.Dispatch<React.SetStateAction<string>>;
  reportedDate: string;
  setReportedDate: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
}

const AddRiskModal: FC<AddRiskModalProps> = ({
  isOpen,
  onClose,
  className,
  cancel,
  width,
  risk,
  setRisk,
  owner,
  setOwner,
  action,
  setAction,
  person,
  setPerson,
  category,
  setCategory,
  assessment,
  setAssessment,
  assessment1,
  setAssessment1,
  dateLogged,
  setDateLogged,
  reportedDate,
  setReportedDate,
  addData,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      className={` w-full h-full ${className}`}
      cancel={cancel}
      width={width}
    >
      <AddRiskModalForm
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
        addData={addData}
      />
    </CustomModal>
  );
};

export default AddRiskModal;
