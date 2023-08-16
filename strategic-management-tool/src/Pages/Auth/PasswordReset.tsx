import reset from "../../assets/images/reset.svg";
import ResetForm from "../../components/ResetForm";

const PasswordReset = () => {
  return (
    <div className="flex w-full h-screen justify-between">
      <div className="flex w-2/4 items-center justify-center">
        <img src={reset} alt="" />
      </div>
      <div className=" flex w-3/4 items-center">
        <ResetForm />
      </div>
    </div>
  );
};

export default PasswordReset;
