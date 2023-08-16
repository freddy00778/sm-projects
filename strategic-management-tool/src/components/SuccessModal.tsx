import { FC } from "react";
import CustomModal from "./CustomModal";
import success from "../assets/images/success.svg";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <CustomModal isOpen={isOpen} size="md" onClose={onClose}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <img src={success} alt="success" width={300} />
        <h1 className="font-medium text-3xl">Login Successful</h1>
      </div>
    </CustomModal>
  );
};

export default SuccessModal;
