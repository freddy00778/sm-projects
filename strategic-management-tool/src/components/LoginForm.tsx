import * as React from "react"
import fav from "../assets/images/fav.svg";
import InputField from "./InputField";
import { useState, useEffect } from "react";
import Button from "./Button";
import { CustomCheckbox } from "./CustomCheckBox";
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { RootState } from "../app/store";
// import { AppDispatch } from "../app/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {authActions} from "../_store";
import Loader from "./Loader";

const LoginForm = () => {
  //@ts-ignore
  const {error, isLoading} = useSelector(state => state.auth)
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authState = useSelector((state: RootState) => state.auth);


  console.log("Error from login", error)

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent form submission

    // dispatch(authActions.login({email, password}))
    try{

      //@ts-ignore
      dispatch(authActions.login({email, password})).then((res) => {
            if (res.type !== "auth/login/rejected") {
              handleSuccessToast()
              setTimeout(() => {
                navigate("/project/dashboard");
              }, 2000)
            }else{
              setErrorMessage("Unable to login at this time. Try again later!")
            }
          })
    }catch (e) {
      alert("error")
    }

  };

  // Functions
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (isChecked) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }, [isChecked, email, password]);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setIsChecked(true);
    }
  }, []);

  const handleSuccessToast = () => {
    toast.success("Login successful. Redirecting...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  }

  return (
    <div className="flex flex-col w-full  px-36">
      {isLoading && <Loader /> }
      <ToastContainer />
      <div className="flex flex-col w-full  space-y-6">
        <a href="/">
          <img src={fav} alt="" />
        </a>
        <form action="submit" className=" ">
          <div className="space-y-4 mb-12">
            <h1 className="text-[#000] font-medium text-3xl">
              Sign in to Change Verve
            </h1>
            <p className="text-black">Enter your details below</p>
          </div>
          {/*{authUser.error && <ToastContainer />}*/}
          {/*{authState.error && <ToastContainer />}*/}
          <InputField
            id="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your full name"
            required
            className=" mb-4 w-full"
          />
          <InputField
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
            className=" mb-4 w-full"
          />
          <p className={"text-red-700 pl-10"}>
            {/*{errorMessage}*/}
            {error?.message !== null?  error?.message : errorMessage}
          </p>
          <br/>
          <div className="flex flex-row items-center justify-between pb-4">
            <CustomCheckbox
              id="exampleCheckbox"
              label="Remember Me"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <a
              href="/instruction"
              className=" text-primary-500 font-semibold text-lg"
            >
              Forgot Password?
            </a>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleLogin}
            className="rounded-lg w-full bg-primary-500"
            type="button"
            // disabled={authState.isLoading}
            // disabled={authUser.isLoading}
          >
            Log in
          </Button>
        </form>
      </div>
      <SuccessModal
        isOpen={secondModalOpen}
        onClose={() => setSecondModalOpen(false)}
      />
    </div>
  );
};

export default LoginForm;
