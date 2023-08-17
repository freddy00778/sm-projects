import * as React from 'react';
import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import ProjectDashboard from "../../components/ProjectDashboard";
import RiskInfo from "../../components/RiskInfo";
import KeyChangeInfo from "../../components/KeyChangeInfo";
import BehaviorChangeInfo from "../../components/BehaviorChangeInfo";
import {useSelector} from "react-redux";

const Home = () => {
    //@ts-ignore
    const {user} = useSelector(state => state.auth)
  return (
    <div className="flex flex-col w-full h-screen">
      <Header backgroundImage={avatar} className="h-1/4">
        <h1>Hello,</h1>
        <span className="text-primary-500">{user?.first_name} !</span>
        <h1>Welcome Back</h1>
      </Header>
      <div className="flex-grow overflow-hidden h-3/4 p-7 space-y-8">
        <h1 className="text-primary-500 text-[18px]">Project Dashboard</h1>
        <div className="grid grid-rows-auto gap-y-10 h-full overflow-y-auto scrollbar-none">
          <ProjectDashboard />
          <RiskInfo />
          <KeyChangeInfo />
          <BehaviorChangeInfo />
          {/* You can add more components here and they will take up equal space and scroll if needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
