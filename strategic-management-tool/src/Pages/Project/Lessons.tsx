import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import LessonsForm from "../../components/Lessons/LessonsForm";

const Lessons = () => {
  return (
    <div className="flex flex-col w-full h-screen ">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Lessons Log
        </h1>
      </Header>
      <LessonsForm />
    </div>
  );
};

export default Lessons;
