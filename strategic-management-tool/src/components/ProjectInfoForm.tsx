import * as React from "react"
import InputField from "./InputField";
import {useEffect, useState} from "react";
import InputDropdown from "./InputDropdown";
import DisplayValuesComponent from "./DisplayValuesComponent";
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {projectActions} from "../_store/project.slice";
import {departmentActions} from "../_store/department.slice";
import Loader from "./Loader";
import {toast, ToastContainer} from "react-toastify";
import {highLevelPlanActions} from "../_store/highLevelPlans.slice";
import {scopeActions} from "../_store/scopes.slice";

interface ProjectInfoFormProps {
  onChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ProjectInfoForm: React.FC<ProjectInfoFormProps> = ({ onChange }) => {
  const dispatch = useDispatch()
  //@ts-ignore
  const {user} = useSelector(state => state.auth)
  //@ts-ignore
  const {isLoading,project} = useSelector(state => state.project)
  //@ts-ignore
  const {highLevelPlans} = useSelector(state => state.plan)
  //@ts-ignore
  const {scopes } = useSelector(state => state.scopes)
  //@ts-ignore
  const scopesState  = useSelector(state => state.scopes)
  console.log("plans", scopes)
  const [category, setCategory] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [manager, setManager] = useState("");
  const [champion, setChampion] = useState("");
  const [change, setChange] = useState("");
  const [change2, setChange2] = useState("");
  const [initiative, setInitiative] = useState(null);
  const [technicalInitiativeEndDate, setTechnicalInitiativeEndDate] = useState(null);
  const [changeInitiativeEndDate, setChangeInitiativeEndDate] = useState(null);
  const [finalBenefitsRealizationDate, setFinalBenefitsRealizationDate] = useState(null);
  const [term, setTerm] = useState("");
  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState(null);
  const [forcesRestrainingChange, setForcesRestrainingChange] = useState("");
  const [term3, setTerm3] = useState("");
  const [term4, setTerm4] = useState("");
  const [term5, setTerm5] = useState("");
  const [term6, setTerm6] = useState("");
  const [term7, setTerm7] = useState("");
  const [term8, setTerm8] = useState("");
  const [term9, setTerm9] = useState("");
  const options = [
    {name: "Strategic Change", value: "strategic-change"},
    {name: "BAU Change", value: "bau-change"},
    {name: "Annual Corporate Initiative", value:"annual-corporate-initiative"}
  ];
  const options1 = [
    {name: "Strategic Change", value: "Strategic-Change"},
    {name: "Start-Up", value: "Start-Up"},
    {name: "Implementation", value: "Implementation"},
    {name: "Anchoring", value:"Anchoring"},
    {name: "Benefits", value: "Benefits"}
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState(options1[0]);
  const [departmentOption, setDepartmentOption] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [displayValues1, setDisplayValues1] = useState<string[]>([]);
  //@ts-ignore
  const {departments} = useSelector(state => state.department)
  const [departmentOptions, setDepartmentOptions] = useState([])
  const [descriptionDepartment, setDescriptionDepartment] = useState()
  // const [date, setDate] = useState<Date | null>(new Date("2024-02-26T14:13:23.389+00:00"));



  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyPress = (value: string) => {
    setDisplayValues([...displayValues, value]);
    setInputValue("");
  };

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

  useEffect(() => {
    const mapped = scopes?.data?.map((scp)=> {
      return scp.description
    })
    setDisplayValues1(mapped)
  },[scopes])

  const handleKeyPress1 = (value: string) => {
    // alert(value)
    if (value){
      //@ts-ignore
      dispatch(scopeActions.createScope({description: value, project_id: user?.project_id})).then((res) => {
        if (res?.type?.includes("fulfilled")){
          //@ts-ignore
          dispatch(scopeActions.getScopeByProjectId({id: user?.project_id}))
          // setDisplayValues1([...displayValues1, value]);
        }
      })
    }

    setInputValue1("");
  };

  const handleDeleteValue1 = (index: number) => {
    const newValues = [...displayValues1];
    newValues.splice(index, 1);
    setDisplayValues1(newValues);
  };

  const handleOptionSelected = (option: any) => {
    setSelectedOption(option.value);
  };
  const handleOptionSelected1 = (option1: any) => {
    setSelectedOption1(option1.value);
  };

  const handleDepartmentOption = (option: any) => {
    setDepartmentOption(option.value)
    setDescriptionDepartment(option.name)
  }

  const handleSave = () => {
    // navigate("/project/dashboard/scope");

    //@ts-ignore
    dispatch(projectActions.updateProject({
      id: user?.project_id,
      category_id: selectedOption?.value,
      project_name: category,
      initiating_dept:  departmentOption?.value,
      main_objective: inputValue,
      project_sponsor_id: sponsor,
      project_manager_id: manager,
      initiative_date: initiative,
      project_champion_id: champion,
      change_initiative_end_date: changeInitiativeEndDate,
      technical_initiative_end_date: technicalInitiativeEndDate,
      change_manager_id: change,
      initiative_state: selectedOption1?.value,
      final_benefits_realization_date: finalBenefitsRealizationDate,
      description_of_change: term,
      why_change: change,
      forces_driving_the_change: term1,
      forces_restraining_change: forcesRestrainingChange,
      change_implementation_data: term2,
      who_will_be_impacted_by_change: term3,
      who_will_help: term4,
      effect_of_the_change: term5,
      first_step: term6,
      second_step: term7,
      third_step: term8,
      fourth_step: term9
    })).then((res) => {
      console.log(res);
      if (res.type?.includes( "fulfilled")){
          toast.success("Successfully updated!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Auto-close the toast after 3 seconds
          });
          return
      }

      toast.error("Failed to update!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close the toast after 3 seconds
      });
    })
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(projectActions.getProjectById({id: user?.project_id}))
    //@ts-ignore
    dispatch(highLevelPlanActions.getHighLevelPlansByProjectId({id: user?.project_id}))
    //@ts-ignore
    dispatch(scopeActions.getScopeByProjectId({id: user?.project_id}))
    //@ts-ignore
    dispatch(departmentActions.getDepartments())
  },[])

  useEffect(() => {
    const projectObject = project?.project
    setDepartmentOption(projectObject?.initiating_dept)
    setSelectedOption(projectObject?.category_id)
    setCategory(project?.project?.project_name)
    setSponsor(project?.project?.project_sponsor_id)
    setInputValue(project?.project?.main_objective)
    setManager(project?.project?.project_manager_id)
    setInitiative(project?.project?.initiative_date)
    setChampion(project?.project?.project_champion_id)
    setTechnicalInitiativeEndDate(project?.project?.technical_initiative_end_date)
    setChangeInitiativeEndDate(projectObject?.change_initiative_end_date)
    setChange(project?.project?.change_manager_id)
    setSelectedOption1(project?.project?.initiative_state)
    setFinalBenefitsRealizationDate(project?.project?.final_benefits_realization_date)
    setTerm(project?.project?.description_of_change)
    setChange(projectObject?.why_change)
    setTerm1(projectObject?.forces_driving_the_change)
    setForcesRestrainingChange(projectObject?.forces_restraining_change)
    setTerm2(projectObject?.change_implementation_data)
    setTerm3(projectObject?.who_will_be_impacted_by_change)
    setTerm4(projectObject?.who_will_help)
    setTerm5(projectObject?.effect_of_the_change)
    setTerm6(highLevelPlans?.data?.[0]?.description)
    setTerm7(highLevelPlans?.data?.[1]?.description)
    setTerm8(highLevelPlans?.data?.[2]?.description)
    setTerm9(highLevelPlans?.data?.[3]?.description)
  },[project])

  useEffect(() => {
    const mapped = departments?.data?.map((res) => {
      return {
        name: res.name,
        value: res.id
      }
    })

    setDepartmentOptions(mapped)
  },[departments])

  return (
      <>
        <ToastContainer />
        {isLoading || scopesState?.isLoading && <Loader/>}
      <form className="flex flex-col w-full h-screen my-10 overflow-y-auto max-h-[10000px] space-y-20 scrollbar-thin scrollbar-thumb-zinc-200">
        <div className="space-y-10">
          <div className="flex w-full space-x-20 px-20 items-center">
            <InputDropdown
                defaultOption={selectedOption}
                id="dropdown"
                header="Category"
                label={`${selectedOption}`}
                options={options}
                onOptionSelected={handleOptionSelected}
                className=" w-full m-0"
            />
            <InputField
                id="email"
                label="Project Name"
                value={category}
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="Enter the project name"
                required
                className="w-full m-0"
            />
          </div>
          {/* first section */}
          <div className="flex w-full h-full space-x-20 px-20 items-start justify-between">
            <div className="flex flex-col w-2/4 space-y-10 ">
              <InputDropdown
                  defaultOption={departmentOption}
                  header={"Initiating Division/Department/Unit"}
                  label={`${departmentOption}`}
                  options={departmentOptions}
                  onOptionSelected={handleDepartmentOption}
                  className="w-full m-0"
                  id="departments"

              />

              <InputField
                  id="project_sponsor"
                  label="Project Sponsor"
                  defaultValue={sponsor}
                  value={sponsor}
                  onChange={(e) => setSponsor(e.target.value)}
                  type="text"
                  placeholder="Enter the project sponsor name"
                  required
                  className="w-full m-0"
              />
              <InputField
                  id="project_manager"
                  label="Project Manager"
                  defaultValue={manager}
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  type="text"
                  placeholder="Enter the project manager name"
                  required
                  className="w-full m-0"
              />
              <InputField
                  id="email"
                  label="Project Champion"
                  defaultValue={champion}
                  value={champion}
                  onChange={(e) => setChampion(e.target.value)}
                  type="text"
                  placeholder="Enter the project champion name"
                  required
                  className="w-full m-0"
              />
              <InputField
                  id="email"
                  label="Change Manager"
                  defaultValue={change}
                  value={change}
                  onChange={(e) => setChange(e.target.value)}
                  type="text"
                  placeholder="Enter the change manager name"
                  required
                  className="w-full m-0"
              />
              <InputDropdown
                  defaultOption={selectedOption1}
                  id="dropdown"
                  header="Change State of the Initiative"
                  label={`${selectedOption1}`}
                  options={options1}
                  onOptionSelected={handleOptionSelected1}
                  className=" w-full m-0"
              />
            </div>
            <div className="flex flex-col w-2/4 h-full space-y-10">
              <InputField
                  id="email"
                  label="Main Objective of the Initiative"
                  value={inputValue}
                  onChange={handleInputChange}
                  onEnterPress={handleKeyPress}
                  type="textarea"
                  placeholder="Describe the main objectives"
                  required
                  className="w-full mb-2"
                  characterLimit={120}
              />
              <div>
                <DisplayValuesComponent
                    displayValues={displayValues}
                    handleDeleteValue={handleDeleteValue}
                />
              </div>

              <InputField
                  id="user-name"
                  label="Initiative Date"
                  defaultValue={initiative}
                  value={initiative}
                  onChange={(e) => setInitiative(e.target.value)}
                  type="datepicker"
                  className="w-full"
              />
              <InputField
                  id="user-name"
                  label="Technical Initiative End Date"
                  defaultValue={technicalInitiativeEndDate}
                  value={technicalInitiativeEndDate}
                  onChange={(e) => setTechnicalInitiativeEndDate(e.target.value)}
                  type="datepicker"
                  className="w-full"
              />
              <InputField
                  id="user-name"
                  label="Change Initiative End Date"
                  defaultValue={changeInitiativeEndDate}
                  value={changeInitiativeEndDate}
                  onChange={(e) => setChangeInitiativeEndDate(e.target.value)}
                  type="datepicker"
                  className="w-full"
              />
              <InputField
                  id="user-name"
                  label="Final Benefits Realization Date"
                  defaultValue={finalBenefitsRealizationDate}
                  value={finalBenefitsRealizationDate}
                  onChange={(e) => setFinalBenefitsRealizationDate(e.target.value)}
                  type="datepicker"
                  className="w-full"
              />
            </div>
          </div>

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
                  id="user-name"
                  label={`The ${descriptionDepartment} Department wants to :`}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={1000}
              />
              <InputField
                  id="user-name"
                  label="Why the change?"
                  value={change2}
                  onChange={(e) => setChange2(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
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
                  value={term1}
                  onChange={(e) => setTerm1(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
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
                  value={forcesRestrainingChange}
                  onChange={(e) => setForcesRestrainingChange(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Provide the necessary information"
                  characterLimit={120}
              />
            </div>
          </div>
          <div className="flex flex-col w-full px-20 py-10  space-y-16  ">
            <div className="w-full flex items-center border-b border-b-border py-4">
              <h1 className="text-[24px] text-[#000] font-semibold">Scope</h1>
            </div>
            <div className="flex flex-col w-full space-y-24">
              <InputField
                  id="email"
                  label="List the activities that are in scope :"
                  value={inputValue1}
                  onChange={handleInputChange1}
                  onEnterPress={handleKeyPress1}
                  type="textarea"
                  placeholder="List the activities"
                  required
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
                  id="user-name"
                  label="The Type Name will be implemented on"
                  value={term2}
                  onChange={(e) => setTerm2(e.target.value)}
                  type="datepicker"
                  className="w-[600px] "
                  placeholder="Provide the necessary information"
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
                  defaultValue={term3}
                  value={term3}
                  onChange={(e) => setTerm3(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="The change will impact"
                  characterLimit={240}
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
                  id="user-name"
                  label="We will be relying on .... to assist us with the implementing the change successfully"
                  defaultValue={term4}
                  value={term4}
                  onChange={(e) => setTerm4(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Enter the name of the engineers, accountants and contractors"
                  characterLimit={240}
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
                  value={term5}
                  onChange={(e) => setTerm5(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type your answer"
                  characterLimit={120}
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
                  id="user-name"
                  label="1st step in the High Level plan. Complete the sentence: “We will start ...”"
                  defaultValue={term6}
                  value={term6}
                  onChange={(e) => setTerm6(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={240}
              />
              <InputField
                  id="user-name"
                  label="2nd step in the High Level plan. Complete the sentence: “The second ...”"
                  value={term7}
                  onChange={(e) => setTerm7(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={240}
              />
              <InputField
                  id="user-name"
                  label="3rd step in the High Level plan. Complete the sentence: “This will be ...”"
                  value={term8}
                  onChange={(e) => setTerm8(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={240}
              />
              <InputField
                  id="user-name"
                  label="4th step in the High Level plan. Complete the sentence: “Finally, we ...”"
                  value={term9}
                  onChange={(e) => setTerm9(e.target.value)}
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full h-full space-x-20 px-20 pb-10 items-end justify-end">
          <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              className="rounded-lg w-[40%] bg-primary-500"
              type="button"
          >
            Save & Continue
          </Button>
        </div>
      </form>
      </>

  );
};

export default ProjectInfoForm;