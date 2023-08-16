// CustomModal.tsx
import React, { FC, MouseEvent } from "react";
export type ModalSize = "sm" | "md" | "lg" | "full";

interface CustomModalProps {
  isOpen: boolean;
  size: ModalSize;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  cancel?: string;
  width?: number;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  size,
  onClose,
  children,
  className,
  cancel,
  width,
}) => {
  if (!isOpen) return null;

  const modalSizeClasses = {
    sm: "min-w-[500px] min-h-[300px]",
    md: "min-w-[650px] min-h-[400px]",
    lg: "w-full h-[95%] mx-6  ",
    full: "w-full h-full ",
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className={`fixed h-full inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ${className}`}
      onClick={handleClick}
    >
      <div
        className={`relative p-10 bg-white rounded-2xl ${modalSizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className="absolute top-4 right-4 px-6 py-6 text-white"
          onClick={onClose}
        >
          <img src={cancel} alt="" width={width} />
          {}
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
