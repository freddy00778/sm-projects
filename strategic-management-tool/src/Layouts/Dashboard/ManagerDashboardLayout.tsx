import { Outlet } from "react-router-dom";
import ManagerSideBar from "../../components/Manager/ManagerSideBar";

const ManagerDashboardLayout = () => {
  return (
    <div className="flex w-full">
      <ManagerSideBar />
      <div className="w-[78%] bg-[#FEFEFE] ">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerDashboardLayout;
