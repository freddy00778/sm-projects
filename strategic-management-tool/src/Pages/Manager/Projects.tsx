import { useState } from "react";
import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import ManagerProjectsComponent from "../../components/Manager/ManagerProjectsComponent";
import Button from "../../components/Button";
import project from "../../assets/images/project.svg";
import { useNavigate } from "react-router-dom";
const ManagerProjects = () => {
  const navigation = useNavigate();
  const [isProjectAdded, setIsProjectAdded] = useState(false);

  const handleRoute = () => {
    setIsProjectAdded(true);
    navigation("/project/dashboard");
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Header backgroundImage={avatar} className="h-1/4">
        <h1 className="text-primary-500 text-[28px] font-normal">Projects</h1>
      </Header>
      <div className="flex-grow overflow-hidden h-3/4 p-7 space-y-8">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-[#000] font-semibold text-[18px]">
              Number of Projects
            </h1>
            <div className="flex items-center justify-center px-4 py-2 border border-border rounded-xl">
              4
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleRoute}
            className="rounded-lg w-[30%] bg-primary-500"
            type="button"
          >
            Add Project
          </Button>
        </div>
        <div className="w-full flex flex-col py-12 px-2 h-screen overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-track-zinc-50">
          {isProjectAdded ? (
            <ManagerProjectsComponent />
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <img src={project} alt="" />
              <p className="text-[20px]">No Projects</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerProjects;
