import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import MatrixForm from "../../components/MatrixForm";

const CmMatrix = () => {
  return (
    <div className="flex flex-col w-full h-screen ">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          CM Activity Matrix Template
        </h1>
      </Header>
      <MatrixForm />
    </div>
  );
};

export default CmMatrix;
