import InputField from "./InputField";
import React, {useEffect, useState} from "react";
import InputDropdown from "./InputDropdown";
import DisplayValuesComponent from "./DisplayValuesComponent";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {projectActions} from "../_store";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import Select from 'react-select';
import {categoryActions} from "../_store/category.slice";
import {departmentActions} from "../_store/department.slice";
import {userActions} from "../_store/users.slice";


interface ProjectInfoFormProps {
  onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ProjectInfoForm: React.FC<ProjectInfoFormProps> = ({ onChange }) => {
  const dispatch = useDispatch()
  const {organisation_id, project_id} = useSelector(state => state.auth.user)
  const {project} = useSelector(state => state.project)
  console.log("User from Auth in Prject", organisation_id)
  console.log("User from Auth in Project", project)
  const [manager, setManager] = useState("");
  const [finalBenefitsRealizationDate, setFinalBenefitsRealizationDate] = useState("");
  const [effectOfTheChange, setEffectOfTheChange] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryOption, setCategoryOption] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentOption, setDepartmentOption] = useState(null);
  const [changeManagerOptions, setChangeManagerOptions] = useState([]);
  const [changeManagerOption, setChangeManagerOption] = useState(null);

  const [projectSponsors, setProjectSponsors] = useState([]);
  const [projectSponsor, setProjectSponsor] = useState(null);

  const [projectChampions, setProjectChampions] = useState([]);
  const [projectChampion, setProjectChampion] = useState(null);
  const [firstStep, setFirstStep] = useState("")

  const [changeStateInitiative, setChangeStateInitiative] = useState();
  const [mainObjective, setMainObjective] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [displayValues1, setDisplayValues1] = useState<string[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      dispatch(categoryActions.getCategories()),
      dispatch(departmentActions.getDepartments()),
      dispatch(userActions.getAll())
    ]).then(([categoriesRes, departmentsRes, usersRes]) => {
      const categoryOptions = categoriesRes?.payload?.data?.map((ctg) => ({
        name: ctg.name,
        value: ctg.id
      }));
      setCategoryOptions(categoryOptions);

      const departmentOptions = departmentsRes?.payload?.data?.map((dpt) => ({
        name: dpt.name,
        value: dpt.id
      }));
      setDepartmentOptions(departmentOptions);

      const users = usersRes?.payload?.data || [];

      const changeManagers = users.map((user) => ({
        name: `${user.first_name} ${user.last_name}`,
        value: user.id
      }));
      setChangeManagerOptions(changeManagers);

      const projectSponsors = users.map((user) => ({
        name: `${user.first_name} ${user.last_name}`,
        value: user.id
      }));
      setProjectSponsors(projectSponsors);

      const projectChampions = users.map((user) => ({
        name: `${user.first_name} ${user.last_name}`,
        value: user.id
      }));
      setProjectChampions(projectChampions);
    });
  }, []);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMainObjective(e.target.value);
    onChange?.(e);
  };

  const handleKeyPress = (value: string) => {
    setDisplayValues([...displayValues, value]);
    setMainObjective("");
  };

  // const handleFirstStep = (e) => {
  //   setFirstStep(e.target.value)
  // }

  const handleDeleteValue = (index: number) => {
    const newValues = [...displayValues];
    newValues.splice(index, 1);
    setDisplayValues(newValues);
  };

  const handleInputChange1 = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue1(e.target.value);
    onChange?.(e);
  };

  const handleKeyPress1 = (value: string) => {
    setDisplayValues1([...displayValues1, value]);
    setInputValue1("");
  };

  const handleDeleteValue1 = (index: number) => {
    const newValues = [...displayValues1];
    newValues.splice(index, 1);
    setDisplayValues1(newValues);
  };


  const handleOptionSelected = (option: any) => {
    setCategoryOption(option.value);
  };

  const handleChangeManagerOption = (option: any) => {
    setChangeManagerOption(option.value);
  };

  const handleProjectSponsorOption = (option: any) => {
    setProjectSponsor(option.value);
    console.log("Sponsor option",option)
  };

  const handleDepartmentOptionSelected = (option: any) => {
    setDepartmentOptions(option.value);
  };

  const handleProjectChampionOption = (option: any) => {
    setProjectChampion(option.value);
  };

  const [projectData, setProjectData] = useState({});
  const validationSchema = Yup.object().shape({})
  // const formOptions = { resolver: yupResolver(validationSchema) };
  // const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { register, setValue, handleSubmit, formState } = useForm({
    defaultValues: projectData
  })

  useEffect(() => {
    const fetchProject = async () => {
      await dispatch(projectActions.getProjectById({id: project_id}));
      setProjectData(project?.project);
    }
    fetchProject()
  }, []);

  useEffect(() => {
    setProjectData(project)
  },[project])


  // useEffect(() => {
  //   if (projectData){
  //     Object.entries(projectData).forEach(([key, value]) => {
  //       setValue(key, value);
  //     });
  //   }
  //
  // }, [projectData, setValue]);

  const handleSave = ({
                        category_id, project_name, initiating_dept, project_sponsor_id,
                        project_manager_id, project_champion_id, change_manager_id, initiative_state,
                        main_objective, initiative_date, technical_initiative_end_date,
                        change_initiative_end_date, final_benefits_realization_date,
                        description_of_change, why_change, forces_driving_the_change,
                        forces_restraining_change, change_implementation_data, who_will_be_impacted_by_change,
                        who_will_help, effect_of_the_change,
                        first_step, second_step, third_step, fourth_step
                      }) => {

    // alert(firstStep)
    return dispatch(projectActions.updateProject({
      id: project_id,
      category_id: categoryOption,
      project_name, initiating_dept: departmentOption,
      main_objective, project_sponsor_id: projectSponsor,
      project_manager_id: changeManagerOption,
      initiative_date, project_champion_id: project_champion_id,
      technical_initiative_end_date, change_initiative_end_date,
      change_manager_id: change_manager_id, initiative_state, final_benefits_realization_date,
      description_of_change, why_change, forces_driving_the_change,
      forces_restraining_change, change_implementation_data,
      who_will_be_impacted_by_change, who_will_help, effect_of_the_change,
      first_step: firstStep, second_step, third_step, fourth_step
    }))
  }

  console.log("Proect DTA", projectData)

  return (
      <form onSubmit={handleSubmit(handleSave)} className="flex flex-col w-full h-screen my-10 overflow-y-auto max-h-[10000px] space-y-20 scrollbar-thin scrollbar-thumb-zinc-200">
        <div className="space-y-10">
          <div className="flex w-full space-x-20 px-20 items-center ">
            <InputDropdown
                id="dropdown"
                header="Category"
                label={`${categoryOption}`}
                options={categoryOptions}
                onOptionSelected={handleOptionSelected}
                className=" w-full m-0"
                {...register("category_id", { required: "Category option is required" })}
            />

            <br/>

            <InputField
                value={projectData?.project_name}
                id="projectName"
                label="Project Name"
                type="text"
                placeholder="Enter the project name"
                className="w-full m-0"
                {...register("project_name", { required: "Project name is required" })}
            />
            <br/>

          </div>
          {/* first section */}
          <div className="flex w-full h-full space-x-20 px-20 items-start justify-between">
            <div className="flex flex-col w-2/4 space-y-10 ">
              <InputDropdown
                  id="dropdown"
                  header="Initiating Division/Department/Unit"
                  label={`${departmentOption}`}
                  options={departmentOptions}
                  onOptionSelected={handleDepartmentOptionSelected}
                  className=" w-full m-0"
                  {...register("category_id", { required: "Category option is required" })}
              />

              <InputDropdown
                  id="projectSponsor"
                  header="Project sponsors"
                  label={`${projectSponsor}`}
                  options={projectSponsors}
                  onOptionSelected={handleProjectSponsorOption}
                  className=" w-full m-0"
                  {...register("project_sponsor_id", { required: "Project sponsor is required" })}
              />


              <InputDropdown
                  id="projectManager"
                  header="Project Manager"
                  label={`${projectSponsor}`}
                  options={projectSponsors}
                  onOptionSelected={handleProjectSponsorOption}
                  className=" w-full m-0"
                  {...register("project_sponsor_id", { required: "Project sponsor is required" })}
              />

              <InputDropdown
                  id="projectChampion"
                  header="Project Champion"
                  label={`${projectChampion}`}
                  options={projectChampions}
                  onOptionSelected={handleProjectChampionOption}
                  className=" w-full m-0"
                  {...register("project_sponsor_id" )}
              />


              <InputDropdown
                  id="dropdown"
                  header="Change Manager"
                  label={`${changeManagerOption}`}
                  options={changeManagerOptions}
                  onOptionSelected={handleChangeManagerOption}
                  className=" w-full m-0"
                  {...register("change_manager_id")}
              />

              <InputDropdown
                  id="dropdown"
                  header="Change State of the Initiative"
                  label={`${categoryOption}`}
                  options={categoryOptions}
                  onOptionSelected={handleOptionSelected}
                  className=" w-full m-0"
                  {...register("initiative_state", )}
              />

            </div>
            <div className="flex flex-col w-2/4 h-full space-y-10">
                <textarea
                    ref={register}
                    rows={`12`}
                    // defaultValue={question?.data?.options?.option_one}
                    {...register("main_objective")}
                    placeholder="Type answer option here..."
                    className="w-full mb-2 border-2 rounded pl-4 pr-4"
                    // className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

              <div>
                <DisplayValuesComponent
                    displayValues={displayValues}
                    handleDeleteValue={handleDeleteValue}
                />
              </div>

              <InputField
                  id="initiativeDate"
                  label="Initiative Date"
                  type="datepicker"
                  className="w-full"
                  {...register("initiative_date")}
              />
              {/*{errors.initiative_date && <span>{errors.initiative_date.message}</span>}*/}

              <InputField
                  id="technicalEndDate"
                  label="Technical Initiative End Date"
                  type="datepicker"
                  className="w-full"
                  onChange={new Date("2024-02-26T14:13:23.389+00:00")}
                  value={new Date("2024-02-26T14:13:23.389+00:00")}
                  {...register("technical_initiative_end_date" )}
              />
              {/*{errors.technical_initiative_end_date && <span>{errors.technical_initiative_end_date.message}</span>}*/}

              <InputField
                  id="user-name"
                  label="Change Initiative End Date"
                  type="datepicker"
                  className="w-full"
                  {...register("change_initiative_end_date" )}
              />
              {/*{errors.change_initiative_end_date && <span>{errors.change_initiative_end_date.message}</span>}*/}

              <InputField
                  id="user-name"
                  label="Final Benefits Realization Date"
                  type="datepicker"
                  className="w-full"
                  {...register("final_benefits_realization_date" )}
              />
            </div>
          </div>
          {/* end of first section */}
        </div>
        <div className="space-y-10">
          <div className="flex flex-col w-full px-20  space-y-16   ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                What do you want to change? Describe the Change
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="changeDescription"
                  label="The IT Department wants to :"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
                  {...register("description_of_change" )}
              />

              <InputField
                  id="whyChange"
                  label="Why the change?"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
                  {...register("why_change" )}
              />

            </div>
          </div>
          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                Forces driving the change
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="user-name"
                  label="What factors are/will motivate, drive and /or support the reason to make the change :"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
                  {...register("forces_driving_the_change" )}
              />
            </div>
          </div>
          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                Forces restraining the change
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="user-name"
                  label="What factors are/will prevent, oppose and/or block this change from happening :"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
                  {...register("forces_restraining_change" )}
              />
            </div>
          </div>

          <div className="flex flex-col w-full px-20 py-10  space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[24px] text-[#000] font-semibold">Scope</h1>
            </div>

            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="scopeActivityOne"
                  label="List the activities that are in scope :"
                  value={inputValue1}
                  onChange={handleInputChange1}
                  onEnterPress={handleKeyPress1}
                  type="textarea"
                  placeholder="List the activities"
                  className="w-full h-[200px] "
                  characterLimit={120}
              />
              <div>
                <DisplayValuesComponent
                    displayValues={displayValues1}
                    handleDeleteValue={handleDeleteValue1}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                When will the change be implemented?
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="changeImplementationDate"
                  label="The Type Name will be implemented on"
                  type="datepicker"
                  className="w-[600px] "
                  placeholder="Provide the necessary information"
                  {...register("change_implementation_data" )}
              />
            </div>
          </div>
          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                Who will be impacted by the change?
              </h1>
            </div>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="user-name"
                  label="Type the name of the stakeholders/stakeholder group that will be affected by the change :"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="The change will impact"
                  characterLimit={120}
                  {...register("who_will_be_impacted_by_change",  )}
              />
            </div>
          </div>
          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                Who will help and/or be consulted?
              </h1>
            </div>
            <h1>
              Type the name of the stakeholders/stakeholder groups that will
              assist or be consulted to prepare for, and implement the change.
            </h1>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="whoWillHelp"
                  label="We will be relying on .... to assist us with the implementing the change successfully"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Enter the name of the engineers, accountants and contractors"
                  characterLimit={120}
                  {...register("who_will_help" )}
              />
            </div>
          </div>
          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">
                What area of work, behavior, business will be most affected(be
                different or changed) by the change?
              </h1>
            </div>

            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="user-name"
                  label="The biggest effect of the change will be on :"
                  value={effectOfTheChange}
                  onChange={(e) => setEffectOfTheChange(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type your answer"
                  characterLimit={120}
                  {...register("effect_of_the_change" )}
              />
            </div>
          </div>

          <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[22px] text-black">How will it be done?</h1>
            </div>
            <h1>4 High level actions in the plan to implement the change</h1>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="first_step"
                  label="1st step in the High Level plan. Complete the sentence: “We will start ...”"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}
                  onChange={(e) => setFirstStep(e.target.value)}
                  {...register("first_step")}

              />
              <InputField
                  id="user-name"
                  label="2nd step in the High Level plan. Complete the sentence: “The second ...”"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}
                  {...register("second_step")}

              />
              <InputField
                  id="user-name"
                  label="3rd step in the High Level plan. Complete the sentence: “This will be ...”"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}
                  {...register("third_step")}

              />
              <InputField
                  id="user-name"
                  label="4th step in the High Level plan. Complete the sentence: “Finally, we ...”"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}
                  {...register("fourth_step")}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full h-full space-x-20 px-20 pb-10 items-end justify-end">
          <Button
              variant="primary"
              size="lg"
              className="rounded-lg w-[40%] bg-primary-500"
              type="submit"
          >
            Save & Continue
          </Button>
        </div>
      </form>
  );
};

export default ProjectInfoForm;
