import InputDropdown from "../InputDropdown";
import InputField from "../InputField";
import Button from "../Button";
import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {budgetActions} from "../../_store";
import {toast, ToastContainer} from "react-toastify";
const BudgetForm = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const paramValue = params["*"]
  //@ts-ignore
  const {user} = useSelector(state => state.auth)
  const {budget} = useSelector(state => state.budget)
  const [benefit, setBenefit] = useState(budget?.data?.how_many_people);
  const [cost, setCost] = useState(budget?.data?.what_do_we_expect_it_to_cost);
  const [allocatedBudgetRequirement, setAllocatedBudgetRequirement] = useState(budget?.data?.allocated_budget_requirement);
  const [allocatedBudget, setAllocatedBudget] = useState(budget?.data?.allocated_budget);
  const [actualSpend, setActualSpend] = useState(budget?.data?.actual_spend);
  const options = [ {name: "Yes", value: true}, {name: "No", value: false}];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  }

  useEffect(() => {
    const budgetObject = budget?.data
    setSelectedOption(budgetObject?.do_we_need_it)
    setBenefit(budgetObject?.how_many_people)
    setCost(budgetObject?.what_do_we_expect_it_to_cost)
    setAllocatedBudgetRequirement(budgetObject?.allocated_budget_requirement)
    setAllocatedBudget(budgetObject?.allocated_budget)
    setActualSpend(budgetObject?.actual_spend)
  },[budget, paramValue])

  const handleSuccessToast = () => {
    toast.success("Successfully updated a budget!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    })
  }

  const handleFormSubmission = () => {
    console.log("Param value", paramValue)
    //@ts-ignore
    dispatch(budgetActions.createBudget({
      budget_item_id: paramValue,
      do_we_need_it: selectedOption.value,
      how_many_people: benefit,
      what_do_we_expect_it_to_cost: cost,
      allocated_budget_requirement: allocatedBudgetRequirement,
      allocated_budget: allocatedBudget,
      actual_spend: actualSpend,
      project_id: user?.project_id
    })).then((res) => {
      if (res?.payload){
        handleSuccessToast()
      }
    })
  }

  return (
      <>

        <ToastContainer />
        <form
            className="flex flex-col w-full h-full overflow-y-auto max-h-[700px] scrollbar-thin scrollbar-thumb-zinc-200 px-6 py-2 space-y-6"
        >
          <div className="flex w-full items-center space-x-10">
            <InputDropdown
                id="dropdown"
                header="Do we need it?"
                defaultOption={selectedOption}
                label={`${selectedOption}`}
                options={options}
                onOptionSelected={handleOptionSelected}
                className=" w-full m-0"
            />
            <InputField
                defaultValue={benefit}
                id="benefit"
                label="For How Many People"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                type="text"
                className="w-full m-0 "
                placeholder="Provide the number"
            />


          </div>
          <div className="flex w-full items-center space-x-10">
            <InputField
                defaultValue={cost}
                id="user-name"
                label="What do we expect it to cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                type="text"
                className="w-full m-0 "
                placeholder="Provide cost amount"
            />
            <InputField
                defaultValue={allocatedBudgetRequirement}
                id="user-name"
                label="Allocated budget requirement"
                value={allocatedBudgetRequirement}
                onChange={(e) => setAllocatedBudgetRequirement(e.target.value)}
                type="number"
                className="w-full m-0 "
                placeholder="Enter your value"
            />
          </div>
          <div className="flex w-full items-center space-x-10 py-6">
            <InputField
                defaultValue={allocatedBudget}
                id="user-name"
                label="Allocated Budget"
                value={allocatedBudget}
                onChange={(e) => setAllocatedBudget(e.target.value)}
                type="number"
                className="w-full m-0 "
                placeholder="Enter your value"
            />
            <InputField
                defaultValue={actualSpend}
                id="user-name"
                label="Actual Spend"
                value={actualSpend}
                onChange={(e) => setActualSpend(e.target.value)}
                type="number"
                className="w-full m-0 "
                placeholder="Enter your value"
            />
          </div>
          <div className="flex w-full h-full space-x-20   items-end justify-end">
            <Button
                variant="primary"
                size="lg"
                onClick={handleFormSubmission}
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

export default BudgetForm;
