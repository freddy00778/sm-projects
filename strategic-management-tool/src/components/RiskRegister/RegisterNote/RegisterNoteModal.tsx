import { FC } from "react";
import CustomModal from "../../CustomModal";
import RegisterNoteModalForm from "./RegisterNoteModalForm";

import { DataType } from "../../../../types";

interface RegisterNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  cancel?: string;
  width?: number;
  assessment: string;
  setAssessment: React.Dispatch<React.SetStateAction<string>>;
  dateLogged: string;
  setDateLogged: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
  dataLength: number;
}

const RegisterNoteModal: FC<RegisterNoteModalProps> = ({
  isOpen,
  onClose,
  className,
  cancel,
  width,
  assessment,
  setAssessment,
  dateLogged,
  setDateLogged,
  text,
  setText,
  addData,
  dataLength,
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      size="full"
      onClose={onClose}
      className={` ${className}`}
      cancel={cancel}
      width={width}
    >
      <RegisterNoteModalForm
        assessment={assessment}
        setAssessment={setAssessment}
        dateLogged={dateLogged}
        setDateLogged={setDateLogged}
        text={text}
        setText={setText}
        addData={addData}
        dataLength={dataLength}
        onClose={onClose}
      />
    </CustomModal>
  );
};

export default RegisterNoteModal;
