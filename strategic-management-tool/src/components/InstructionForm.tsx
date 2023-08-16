import InputField from "./InputField";
import { useState } from "react";
import Button from "./Button";
import fav from "../assets/images/fav.svg";
import { useNavigate } from "react-router-dom";

const InstructionForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleRouteToPasswordReset = () => {
    navigate("/reset");
  };
  return (
    <div className="flex flex-col w-full px-36 space-y-10">
      <a href="/">
        <img src={fav} alt="" />
      </a>
      <form action="submit" className=" space-y-8">
        <div className="space-y-4 mb-12">
          <h1 className="text-[#000] font-medium text-3xl">Password Reset</h1>
          <p className="text-black">Enter your email address below</p>
        </div>
        <InputField
          id="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email address"
          required
          className=" mb-4 w-full"
        />

        <Button
          variant="primary"
          size="lg"
          onClick={handleRouteToPasswordReset}
          className="rounded-lg w-full bg-primary-500"
          type="button"
        >
          Send Instructions
        </Button>
      </form>
    </div>
  );
};

export default InstructionForm;
