// @ts-nocheck

import InputField from "./InputField";
import Button from "./Button";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {caseForChangeActions} from "../_store/caseForChange.slice";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const CaseForChangeForm = () => {
  const {user} = useSelector(state => state.auth)
  const {caseForChange} = useSelector(state => state.caseForChange)
  const {isLoading} = useSelector(state => state.caseForChange)
  const caseForChangeObject = caseForChange?.draft
  console.log("case For Change" , caseForChangeObject?.description_of_change)

  const organisationNameAndDescription = `${user?.organisation_name} wants to ${caseForChangeObject?.description_of_change}.`
  const whyChange = `We have taken this decision because ${caseForChangeObject?.why_change}.`
  const projectNameAndImplementationDate = `${caseForChangeObject?.project_name} will be implemented on ${caseForChangeObject?.when_will_change_be_implemented}.`
  const whoWillBeImpactedByChange = `The change will impact ${caseForChangeObject?.who_will_be_impacted_by_change}.`
  const whoWillHelp = `We will be relying on ${caseForChangeObject?.who_will_help} to help us with implementing the change successfully.`
  const whoWillBeMostAffectedByTheChange = `The biggest effect of the change will be on ${caseForChangeObject?.who_will_be_most_affected_by_the_change}.`
  const firstStepHighLevePlan = `1st step in the high level plan. We will start by .`
  const secondStepHighLevePlan = `2nd step in the high level plan. The second step is to  .`
  const thirdStepHighLevePlan = `3rd step in the high level plan. This will be followed by  .`
  const fourthStepHighLevePlan = `4th step in the high level plan. Finally we will  .`
  const whatIsInItForStakeholders = `With this change, the affected stakeholders will ${caseForChangeObject?.what_is_in_it_for_the_affected_stakeholders}.`
  const what_may_affected_stakeholders_be_concerned_about = `With this change, the affected stakeholders will ${caseForChangeObject?.what_may_affected_stakeholders_be_concerned_about}.`
  const whatWouldYouLikeToManageTheseExpectations = `With regards to what we would like to confirm that ${caseForChangeObject?.what_would_you_like_to_manage_these_expectations}.`
  const any_major_risk = `With regards to what we would like to confirm that ${caseForChangeObject?.any_major_risk}.`
  const futureCommunication = `${caseForChangeObject?.future_communication}.`
  const [draftPhrase, setDraftPhrase] = useState("")
  const dispatch = useDispatch()
  const [stakeholderBenefits, setStakeholderBenefits] = useState(caseForChange?.caseForChange?.data?.stakeholder_benefits);
  const [stakeholderConcerns, setStakeholderConcerns] = useState(caseForChange?.caseForChange?.data?.stakeholder_concerns);
  const [concernsAddressal, setConcernsAddressal] = useState(caseForChange?.caseForChange?.data?.concerns_addressal);
  const [stakeholderPersonalExpectations, setStakeholderPersonalExpectations] = useState(caseForChange?.caseForChange?.data?.stakeholder_personal_expectations);
  const [expectationsManagementResponse, setExpectationsManagementResponse] = useState(caseForChange?.caseForChange?.data?.expectations_management_response);
  const [majorRisks, setMajorRisks] = useState(caseForChange?.caseForChange?.data?.major_risks_or_info);
  const [additionalInfoSource, setAdditionalInfoSource] = useState(caseForChange?.caseForChange?.data?.additional_info_source);
  const [text, setText] = useState(draftPhrase);

  useEffect(() => {
    const draftSections = [
      organisationNameAndDescription,
      whyChange,
      projectNameAndImplementationDate,
      whoWillBeImpactedByChange,
      whoWillHelp,
      whoWillBeMostAffectedByTheChange,
      firstStepHighLevePlan,
      secondStepHighLevePlan,
      thirdStepHighLevePlan,
      fourthStepHighLevePlan,
      whatIsInItForStakeholders,
      what_may_affected_stakeholders_be_concerned_about,
      whatWouldYouLikeToManageTheseExpectations,
      any_major_risk,
      futureCommunication,
    ];
    const draft = draftSections.join('\n\n');
    setText(draft);
    console.log("Draft", draftPhrase)
  }, [caseForChange])



  const handleSuccessToast = () => {
    toast.success("Successfully updated!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  };

  const fetchCase = () => {
    dispatch(caseForChangeActions.getCaseForChangeByProjectId({id: user?.project_id}))
  }
  useEffect(() => {
    fetchCase()
  }, [])

  const navigate = useNavigate();
  const handleSave = () => {
    // navigate("/project/dashboard/scope");
    //@ts-ignore
    dispatch(caseForChangeActions.updateCaseForChange({
      project_id: user?.project_id,
      stakeholder_benefits: stakeholderBenefits,
      stakeholder_concerns: stakeholderConcerns,
      concerns_addressal: concernsAddressal,
      stakeholder_personal_expectations: stakeholderPersonalExpectations,
      expectations_management_response:expectationsManagementResponse,
      major_risks_or_info:majorRisks,
      additional_info_source: additionalInfoSource
    })).then((res) => {
      // if (res?.payload){
        handleSuccessToast()
         fetchCase()
      // }
    })
  };
  return (
      <>
        <ToastContainer />
        {
          isLoading && <Loader />
        }
    <form
      action=""
      className="flex flex-col w-full h-screen overflow-y-auto max-h-[10000px]  scrollbar-thin scrollbar-thumb-zinc-200"
    >
      <h1 className="text-center text-primary-500 text-[26px]">
        Final Draft Case For Change
      </h1>
      <div className="px-20 py-10">
        <InputField
          id="user-name"
          //   label="We will be relying on .... to assist us with the implementing the change successfully"
          value={text}
          onChange={(e) => setText(draftPhrase)}
          type="textarea"
          className="w-full h-[400px] text-[16px] bg-primary-50 bg-opacity-20"
          // disabled={true}
          placeholder=""

        />
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            What is in it for the affected stakeholders? What would the benefits
            be to the affected stakeholders?
          </h1>
        </div>
        <h1>
          Complete the sentence “With this change the affected stakeholders will
        </h1>
        <div className="flex flex-col w-full space-y-24">

          <textarea
              value={stakeholderBenefits}
              defaultValue={caseForChange?.data?.stakeholder_benefits}
              // defaultValue={"88888as"}
              onChange={(e) => setStakeholderBenefits(e.target.value)}
                    placeholder="Type in the benefits"
                    className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
          />

          {/*<InputField*/}
          {/*    defaultValue={term}*/}
          {/*  id="user-name"*/}
          {/*  //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
          {/*  value={term}*/}
          {/*  onChange={(e) => setTerm(e.target.value)}*/}
          {/*  type="textarea"*/}
          {/*  className="w-full h-[200px] "*/}
          {/*  placeholder="Type in the benefits"*/}
          {/*  characterLimit={120}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            What may affected stakeholders be concerned about ( that will affect
            them personally?)
          </h1>
        </div>
        <div className="flex flex-col w-full space-y-24">

               <textarea
                   value={stakeholderConcerns}
                   defaultValue={caseForChange?.data?.stakeholder_concerns}
                   onChange={(e) => setStakeholderConcerns(e.target.value)}
                   placeholder="Type in the effects"
                         className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
               />

        {/*  <InputField*/}
        {/*    id="user-name"*/}
        {/*    //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
        {/*    value={term1}*/}
        {/*    onChange={(e) => setTerm1(e.target.value)}*/}
        {/*    type="textarea"*/}
        {/*    className="w-full h-[200px] "*/}
        {/*    placeholder="Type in the effects"*/}
        {/*    characterLimit={120}*/}
        {/*  />*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            What would you like to say to address these concerns.
          </h1>
        </div>
        <h1>
          Complete the sentence “ We realize that you may be concerned about and
          would like to (insert your response i.e. assure you .... / advise that
          .... )
        </h1>
        <div className="flex flex-col w-full space-y-24">

                   <textarea
                       value={concernsAddressal}
                       defaultValue={caseForChange?.data?.concerns_addressal}
                       onChange={(e) => setConcernsAddressal(e.target.value)}
                       placeholder="Type in the effects"
                             className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
                   />

          {/*<InputField*/}
          {/*  id="user-name"*/}
          {/*  //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
          {/*  value={term2}*/}
          {/*  onChange={(e) => setTerm2(e.target.value)}*/}
          {/*  type="textarea"*/}
          {/*  className="w-full h-[200px] "*/}
          {/*  placeholder="Type in your response"*/}
          {/*  characterLimit={120}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            Only complete this if relevant- What may affected stakeholders be
            expecting (that will benefit them personally? )
          </h1>
        </div>
        <h1>
          Complete the sentence “We are also aware that some stakeholders may be
          expecting ...”
        </h1>
        <div className="flex flex-col w-full space-y-24">

                   <textarea
                       value={stakeholderPersonalExpectations}
                       defaultValue={caseForChange?.data?.stakeholder_personal_expectations}
                       onChange={(e) => setStakeholderPersonalExpectations(e.target.value)}
                       placeholder="Type in your response"
                             className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
                   />

          {/*<InputField*/}
          {/*  id="user-name"*/}
          {/*  //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
          {/*  value={term3}*/}
          {/*  onChange={(e) => setTerm3(e.target.value)}*/}
          {/*  type="textarea"*/}
          {/*  className="w-full h-[200px] "*/}
          {/*  placeholder="Type in your response"*/}
          {/*  characterLimit={120}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            Only complete this if relevant- What would you like to say to manage
            these expectations?
          </h1>
        </div>
        <h1>
          Complete the sentence “ With regards to we would like to ...(i.e.
          confirm that ... OR point out that ... Mention that ... )
        </h1>
        <div className="flex flex-col w-full space-y-24">

                   <textarea
                       value={expectationsManagementResponse}
                       defaultValue={caseForChange?.data?.expectations_management_response}
                             onChange={(e) => setExpectationsManagementResponse(e.target.value)}
                             placeholder="Type in the effects"
                             className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
                   />

          {/*<InputField*/}
          {/*  id="user-name"*/}
          {/*  //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
          {/*  value={term4}*/}
          {/*  onChange={(e) => setTerm4(e.target.value)}*/}
          {/*  type="textarea"*/}
          {/*  className="w-full h-[200px] "*/}
          {/*  placeholder="Type in your response"*/}
          {/*  characterLimit={120}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            Only complete this if relevant- Any major risk or information
            stakeholders should take not of?
          </h1>
        </div>

        <div className="flex flex-col w-full space-y-24">

                   <textarea
                       value={majorRisks}
                       defaultValue={caseForChange?.data?.major_risks_or_info}
                             onChange={(e) => setMajorRisks(e.target.value)}
                             placeholder="Type in the effects"
                             className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
                   />
          {/*<InputField*/}
          {/*  id="user-name"*/}
          {/*  //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
          {/*  value={term5}*/}
          {/*  onChange={(e) => setTerm5(e.target.value)}*/}
          {/*  type="textarea"*/}
          {/*  className="w-full h-[200px] "*/}
          {/*  placeholder="Type in your response"*/}
          {/*  characterLimit={120}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex flex-col w-full px-20 py-10 space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-4">
          <h1 className="text-[22px] text-black">
            Future communication: Where can they find more information? / Who
            will be providing more information and when in future?
          </h1>
        </div>

        <div className="flex flex-col w-full space-y-24">

                   <textarea
                       value={additionalInfoSource}
                       defaultValue={caseForChange?.data?.additional_info_source}
                       onChange={(e) => setAdditionalInfoSource(e.target.value)}
                       placeholder="Type in your response"
                             className="w-full h-[200px]   border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2 "
                   />

          {/*<InputField*/}
          {/*  id="user-name"*/}
          {/*  //   label="We will be relying on .... to assist us with the implementing the change successfully"*/}
          {/*  value={term6}*/}
          {/*  onChange={(e) => setTerm6(e.target.value)}*/}
          {/*  type="textarea"*/}
          {/*  className="w-full h-[200px] "*/}
          {/*  placeholder="Type in your response "*/}
          {/*  characterLimit={120}*/}
          {/*/>*/}
        </div>
      </div>
      <div className="flex w-full px-20 justify-between my-6">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          className="rounded-lg w-[40%] bg-white border-primary-500 border-2 text-primary-500"
          type="button"
        >
          Download Final Draft
        </Button>
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

export default CaseForChangeForm;
