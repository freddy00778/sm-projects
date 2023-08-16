import { ProjectData } from "../data/ProjectData";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {projectActions} from "../_store/project.slice";
import {unslugify} from "../_helpers/functions";

const ProjectDashboard = () => {
    const {user} = useSelector(state => state.auth)
    const {projects} = useSelector(state => state.project)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(projectActions.getProjectsByOrgId({id: user?.organisation_id}))
    },[])

    console.log("Project", projects)

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center border-b border-b-zinc-100  h-12">
        Project Information
      </div>
      <div className="flex flex-row flex-wrap w-full   pt-6 px-8 justify-between  items-center ">
        {/*{ProjectData.map(({ id, title, name }) => (*/}
          <div
            className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10"
            key={projects?.data?.[0].id}
          >
            <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                Type of Project
            </div>
            <h1 className="px-4 text-[30px] w-48 font-medium pt-2">
                {projects?.data?.[0].project_name}
            </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Approach
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">
                  {unslugify(projects?.data?.[0].type)}
              </h1>
          </div>

          <div
              className="flex flex-col justify-start bg-white h-44 w-72 rounded-xl shadow-md mt-10">
              <div className="border-b py-4 border-b-zinc-100 bg-primary-50 bg-opacity-50 text-primary-500 flex items-center px-4 text-[14px] rounded-tl-xl rounded-tr-xl">
                  Change Complexity
              </div>
              <h1 className="px-4 text-[30px] w-48 font-medium pt-2">
                  {unslugify(projects?.data?.[0].complexity_of_change)}
              </h1>
          </div>
        {/*))}*/}
      </div>
    </div>
  );
};

export default ProjectDashboard;
