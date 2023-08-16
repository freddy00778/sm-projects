import { Outlet } from "react-router-dom";

import SideBar from "../../components/SideBar";

const ProjectDashboardLayout = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-[78%] bg-[#FEFEFE] ">
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectDashboardLayout;
