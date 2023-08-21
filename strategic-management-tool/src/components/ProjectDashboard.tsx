import * as React from "react"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {projectActions} from "../_store/project.slice";
import {unslugify} from "../_helpers/functions";

const ProjectDashboard = () => {
    //@ts-ignore
    const {user} = useSelector(state => state.auth)
    //@ts-ignore
    const {projects,project} = useSelector(state => state.project)
    const dispatch = useDispatch()

    useEffect(() => {
        //@ts-ignore
        dispatch(projectActions.getProjectById({id: user?.project_id}))
    },[])

    console.log("Project", project?.project)

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center border-b border-b-zinc-100  h-12">
        Project Information
      </div>
      <div className="flex flex-row flex-wrap w-full   pt-6 px-8 justify-between  items-center ">
        {/*{ProjectData.map(({ id, title, name }) => (*/}
          <div
            className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10"
            key={project?.project?.id}
          >
            <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                Type of Project
            </div>
            <h1 className="px-4 text-[30px] w-48 font-medium pt-2">
                {project?.project?.project_name}
            </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Approach
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">
                  {unslugify(project?.project?.type)}
              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Complexity
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">
                  {unslugify(project?.project?.complexity_of_change)}
              </h1>
          </div>


          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Activity Level
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Gear
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Stage of Completion
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>


          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Process
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Preliminary Budget Requirement
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Allocated CM Budget
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  CM Budget Status
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">

              </h1>
          </div>

        {/*))}*/}
      </div>
    </div>
  );
};

export default ProjectDashboard;
