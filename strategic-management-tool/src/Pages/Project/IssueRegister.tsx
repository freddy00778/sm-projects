import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import IssueRegisterLayout from "../../components/IssueRegister/IssueRegisterLayout";
const IssueRegister = () => {
  return (
    <div className="flex flex-col w-full h-screen space-y-6">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Issue Register
        </h1>
      </Header>
      <div className="px-7 h-3/4">
        <IssueRegisterLayout />
      </div>
    </div>
  );
};

export default IssueRegister;
