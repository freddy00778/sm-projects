import { useState } from "react";
import CustomModal, { ModalSize } from "./CustomModal";
import InputField from "./InputField";
import Button from "./Button";

const AddButton = () => {
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Reason added: ${inputValue}`);
    setInputValue("");
    setShowModal(false);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents event from bubbling up to parent elements
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center">
      <CustomModal
        isOpen={showModal}
        size={"md" as ModalSize} // size can be "sm", "md", "lg" or "full"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-20">
          <InputField
            id="user-name"
            label="Reason"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="textarea"
            className="w-full h-[200px] "
            placeholder="Enter your reason"
            characterLimit={120}
          />
          <div className="flex w-full h-full space-x-20  pb-10 items-end justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowModal(false)}
              className="rounded-lg w-[40%] bg-primary-500"
              type="button"
            >
              Submit
            </Button>
          </div>
        </form>
      </CustomModal>
      <div
        className="border cursor-pointer rounded-lg px-2 py-1"
        onClick={handleButtonClick}
      >
        +
      </div>
      <span>Click to add</span>
    </div>
  );
};

export default AddButton;
