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


  useEffect(() => {
      dispatch(categoryActions.getCategories()),
      dispatch(departmentActions.getDepartments()),
      dispatch(userActions.getAll())
  }, []);


  const handleSave = () => {
  }



  return (
      <form className="flex flex-col w-full h-screen my-10 overflow-y-auto max-h-[10000px] space-y-20 scrollbar-thin scrollbar-thumb-zinc-200">
        <div className="space-y-10">
          <div className="flex w-full space-x-20 px-20 items-center ">
            <InputDropdown
                id="dropdown"
                header="Category"
                label={""}

                className=" w-full m-0"
            />

            <br/>

            <InputField
                id="projectName"
                label="Project Name"
                type="text"
                placeholder="Enter the project name"
                className="w-full m-0"
            />
            <br/>

          </div>
          {/* first section */}
          <div className="flex w-full h-full space-x-20 px-20 items-start justify-between">
            <div className="flex flex-col w-2/4 space-y-10 ">
              <InputDropdown
                  id="dropdown"
                  header="Initiating Division/Department/Unit"

                  className=" w-full m-0"
              />

              <InputDropdown
                  id="projectSponsor"
                  header="Project sponsors"
                  className=" w-full m-0"
              />


              <InputDropdown
                  id="projectManager"
                  header="Project Manager"

                  className=" w-full m-0"
              />

              <InputDropdown
                  id="projectChampion"
                  header="Project Champion"

                  className=" w-full m-0"
              />


              <InputDropdown
                  id="dropdown"
                  header="Change Manager"
                  label={`${changeManagerOption}`}
                  options={changeManagerOptions}
                  onOptionSelected={handleChangeManagerOption}
                  className=" w-full m-0"
              />

              <InputDropdown
                  id="dropdown"
                  header="Change State of the Initiative"

                  className=" w-full m-0"
              />

            </div>
            <div className="flex flex-col w-2/4 h-full space-y-10">
                <textarea
                    rows={`12`}
                    placeholder="Type answer option here..."
                    className="w-full mb-2 border-2 rounded pl-4 pr-4"
                    // className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

              <div>
                {/*<DisplayValuesComponent*/}
                {/*    displayValues={displayValues}*/}
                {/*    handleDeleteValue={handleDeleteValue}*/}
                {/*/>*/}
              </div>

              <InputField
                  id="initiativeDate"
                  label="Initiative Date"
                  type="datepicker"
                  className="w-full"
              />
              {/*{errors.initiative_date && <span>{errors.initiative_date.message}</span>}*/}

              <InputField
                  id="technicalEndDate"
                  label="Technical Initiative End Date"
                  type="datepicker"
                  className="w-full"
                  onChange={new Date("2024-02-26T14:13:23.389+00:00")}
                  value={new Date("2024-02-26T14:13:23.389+00:00")}
              />
              {/*{errors.technical_initiative_end_date && <span>{errors.technical_initiative_end_date.message}</span>}*/}

              <InputField
                  id="user-name"
                  label="Change Initiative End Date"
                  type="datepicker"
                  className="w-full"
              />
              {/*{errors.change_initiative_end_date && <span>{errors.change_initiative_end_date.message}</span>}*/}

              <InputField
                  id="user-name"
                  label="Final Benefits Realization Date"
                  type="datepicker"
                  className="w-full"
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
              />

              <InputField
                  id="whyChange"
                  label="Why the change?"
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
                  id="scopeActivityOne"
                  label="List the activities that are in scope :"

                  type="textarea"
                  placeholder="List the activities"
                  className="w-full h-[200px] "
                  characterLimit={120}
              />
              {/*<div>*/}
              {/*  <DisplayValuesComponent*/}
              {/*      displayValues={displayValues1}*/}
              {/*      handleDeleteValue={handleDeleteValue1}*/}
              {/*  />*/}
              {/*</div>*/}
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

              />
              <InputField
                  id="user-name"
                  label="2nd step in the High Level plan. Complete the sentence: “The second ...”"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}

              />
              <InputField
                  id="user-name"
                  label="3rd step in the High Level plan. Complete the sentence: “This will be ...”"
                  type="textarea"
                  className="w-full h-[200px] "
                  placeholder="Type in your response"
                  characterLimit={120}

              />
              <InputField
                  id="user-name"
                  label="4th step in the High Level plan. Complete the sentence: “Finally, we ...”"
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
