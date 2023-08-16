import { FC } from "react";
import CustomModal from "../../CustomModal";
import AddKeyChangeModalForm from "./AddKeyChangeModalForm";
import { DataType } from "../../../../types";

interface KeyChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  cancel?: string;
  width?: number;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  change: string;
  setChange: React.Dispatch<React.SetStateAction<string>>;
  asIs: string;
  setAsIs: React.Dispatch<React.SetStateAction<string>>;
  toBe: string;
  setToBe: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
}

const KeyChangeModal: FC<KeyChangeModalProps> = ({
  isOpen,
  onClose,
  className,
  cancel,
  width,
  change,
  asIs,
  toBe,
  setChange,
  setAsIs,
  setToBe,
  addData,
  title,
  setTitle,
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
      <AddKeyChangeModalForm
        title={title}
        setTitle={setTitle}
        change={change}
        setChange={setChange}
        asIs={asIs}
        setAsIs={setAsIs}
        toBe={toBe}
        setToBe={setToBe}
        onClose={onClose}
        addData={addData}
      />
    </CustomModal>
  );
};

export default KeyChangeModal;
