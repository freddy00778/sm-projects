import { ProjectDetailsData } from "../../data/ProjectDetailsData";
import dots from "../../assets/images/dots.svg";
import userImage from "../../assets/images/user.svg";
import calendar from "../../assets/images/calendar.svg";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {projectActions} from "../../_store/project.slice";

const unslugify = (slug) => {
    return slug
        .split('-') // Split on hyphens
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' '); // Join words with spaces
}


const ManagerProjectsComponent = () => {
    const {user} = useSelector(state => state.auth)
    const {projects} = useSelector(state => state.project)
    const [projectList, setProjectList] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(projectActions.getProjectsByOrgId({id: user?.organisation_id}))
    }, [])

    useEffect(() => {
        console.log("projects", projects)
        const mapped = projects?.data?.map((pj) => {
            return   {
                id: pj?.id,
                title: pj?.project_name,
                projectType: unslugify(pj?.category_id),
                projectManager: pj?.project_manager_id,
                initialDate: pj?.initiative_date,
                color: "#04FDDF",
            }
        })
        setProjectList(mapped)
    },[projects])

  return (
    <div>
      <div className="flex flex-wrap gap-8  w-full h-full">
        {projectList?.map(
          ({ id, title, color, projectManager, projectType, initialDate }) => (
            <div
              key={id}
              className="flex flex-col px-6 py-8  drop-shadow-md rounded-2xl bg-white space-y-6"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div
                    style={{ backgroundColor: color }}
                    className="w-2 h-2 rounded-full"
                  ></div>
                  <p className="text-[14px]">{projectType}</p>
                </div>
                <div className="flex items-center justify-center px-2 py-1 border border-opacity-30 border-border rounded-md">
                  <img src={dots} alt="dots" width={20} />
                </div>
              </div>
              <div>
                <h1 className="text-[25px] font-medium">{title}</h1>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col space-y-2">
                  <h1 className="text-primary-500 text-sm font-semibold">
                    Project Manager
                  </h1>
                  <div className="flex space-x-2">
                    <img src={userImage} alt="user" />
                    <p className="text-sm">{projectManager}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <h1 className="text-primary-500 text-sm font-semibold">
                    Initiative Date
                  </h1>
                  <div className="flex space-x-2">
                    <img src={calendar} alt="calendar" width={15} />
                    <p className="text-sm">{initialDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ManagerProjectsComponent;
