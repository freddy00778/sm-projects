import * as React from 'react';
import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import ManagerProjectsComponent from "../../components/Manager/ManagerProjectsComponent";
import Filter from "../../components/Executive/Filter";
import {useSelector} from "react-redux";

const ExecutiveProjects = () => {
  //@ts-ignore
  const {projects} = useSelector(state=> state.project)
  return (
    <div className="flex flex-col w-full h-screen">
      <Header backgroundImage={avatar} className="h-1/4">
        <h1 className="text-primary-500 text-[28px] font-normal">Projects</h1>
      </Header>
      <div className="flex-grow overflow-hidden h-3/4 p-7 space-y-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center w-2/4 justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-[#000] font-semibold text-[18px]">
                Number of Projects
              </h1>
              <div className="flex items-center justify-center px-4 py-2 border border-border rounded-xl">
                {projects?.data?.length}
              </div>
            </div>
          </div>
          <Filter />
        </div>
        <div className="w-full flex flex-col py-12 px-2 h-screen overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-track-zinc-50">
          <ManagerProjectsComponent />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveProjects;
