import { FC } from "react";
import CustomModal from "../CustomModal";
import IssueModalForm from "./IssueModalForm";
import { DataType } from "../../../types";

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  cancel?: string;
  width?: number;
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
}

const IssueModal: FC<IssueModalProps> = ({
  isOpen,
  onClose,
  className,
  cancel,
  width,
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
      <IssueModalForm
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
        addData={addData}
      />
    </CustomModal>
  );
};

export default IssueModal;
