import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import DecisionForm from "../../components/Decision/DecisionForm";

const DecisionRegister = () => {
  return (
    <div className="flex flex-col w-full h-screen ">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Decision Register
        </h1>
      </Header>
      <DecisionForm />
    </div>
  );
};

export default DecisionRegister;
