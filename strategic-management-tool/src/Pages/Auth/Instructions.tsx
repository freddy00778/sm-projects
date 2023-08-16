import InstructionForm from "../../components/InstructionForm";
import reset from "../../assets/images/reset.svg";

const ResetInstructions = () => {
  return (
    <div className="flex w-full h-screen justify-between">
      <div className="flex w-2/4 items-center justify-center">
        <img src={reset} alt="" />
      </div>
      <div className=" flex w-3/4 items-center">
        <InstructionForm />
      </div>
    </div>
  );
};

export default ResetInstructions;
