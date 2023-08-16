import ProjectInfoForm from "../../components/ProjectInfoForm";
import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import Loader from "../../components/Loader";
import {useSelector} from "react-redux";

const ProjectInformation = () => {
    const {isLoading} = useSelector(state => state.project)
  return (
    <div className="flex flex-col w-full h-screen space-y-6">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Project Information
        </h1>
      </Header>
        {isLoading &&
          <Loader/>
        }

        <ProjectInfoForm />
    </div>
  );
};

export default ProjectInformation;
