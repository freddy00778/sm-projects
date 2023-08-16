import { Outlet } from "react-router-dom";
import ExecutiveSideBar from "../../components/Executive/ExecutiveSideBar";

const ExecutiveDashboardLayout = () => {
  return (
    <div className="flex w-full">
      <ExecutiveSideBar />
      <div className="w-[78%] bg-[#FEFEFE] ">
        <Outlet />
      </div>
    </div>
  );
};

export default ExecutiveDashboardLayout;
