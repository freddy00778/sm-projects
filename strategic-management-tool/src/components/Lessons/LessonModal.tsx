// @ts-nocheck

import { FC } from "react";
import CustomModal from "../CustomModal";
import LessonModalForm from "./LessonModalForm";

import { DataType } from "../../../types";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  cancel?: string;
  width?: number;
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  loggedBy: string
  dateLogged: string
  setDateLogged: string
  setLoggedBy: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
  dataLength: number;
  options: [],
  handleOptionSelected: React.Dispatch<React.SetStateAction<any>>
  option: any
  saveForm: React.Dispatch<React.SetStateAction<void>>
}

const LessonModal: FC<LessonModalProps> = ({isOpen,
  onClose,
  className,
  cancel,
  width,
  category,
  setCategory,
  loggedBy,
  setLoggedBy,
  dateLogged,
  setDateLogged,
  description,
  setDescription,
  addData,
  dataLength,
  options,
  handleOptionSelected,
  option,
  saveForm
}) => {
  return (
    <CustomModal
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
      className={` ${className}`}
      cancel={cancel}
      width={width}
    >
      <LessonModalForm
        category={category}
        setCategory={setCategory}
        loggedBy={loggedBy}
        setLoggedBy={setLoggedBy}
        dateLogged={dateLogged}
        setDateLogged={setDateLogged}
        description={description}
        setDescription={setDescription}
        addData={addData}
        dataLength={dataLength}
        onClose={onClose}
        options={options}
        saveForm={saveForm}
        handleOptionSelected={handleOptionSelected}
      />
    </CustomModal>
  );
};

export default LessonModal;
