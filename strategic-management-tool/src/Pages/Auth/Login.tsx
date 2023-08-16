import LoginForm from "../../components/LoginForm";
import login from "../../assets/images/login.svg";

const Login = () => {
  return (
    <div className="flex w-full h-screen justify-between">
      <div className="flex w-2/4 items-center justify-center">
        <img src={login} alt="" />
      </div>
      <div className=" flex w-3/4  items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
