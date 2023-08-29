// @ts-nocheck

import {Outlet, useNavigate, useLocation, useParams} from "react-router-dom";
import BudgetListGenerator from "./BudgetListGenerator";
import NoBudget from "./NoBudget";
import { useState, useEffect } from "react";
import {budgetActions} from "../../_store";
import {useDispatch} from "react-redux";

const BudgetLayout = () => {
  const dispatch = useDispatch()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const paramValue = params["*"]

  console.log("Params from Budget", paramValue)

  const handleSelectionChange = (options: any) => {
    setSelectedOptions(options);
    const fetchBudget = async () => {
      await dispatch(budgetActions.getBudgetByBudgetItemId({id: paramValue}));
    }
    fetchBudget()
  };

  useEffect(() => {
    if (
      selectedOptions.length === 0 &&
      location.pathname !== "/project/dashboard/budget"
    ) {
      navigate("/project/dashboard/budget");
    }

    console.log("Selected options from Budget Layout", selectedOptions)

  }, [selectedOptions, navigate, location]);

  return (
    <div className="w-full h-full space-y-6">
      <div>
        <h1>Budget Requirements</h1>
      </div>
      <div className="border border-border border-opacity-20 rounded-2xl w-full h-[90%]">
        <div className="flex w-full items-center h-[16%] px-10 py-6 border-b border-b-border border-opacity-20">
          <span className="flex w-1/4">Budget List</span>
          <div className="flex w-3/4 items-center justify-between">
            <span className="text-primary-500">Budget Details</span>
            <div className="flex space-x-6">
              <div className="flex px-6 py-3 border cursor-pointer border-border border-opacity-40 rounded-lg items-center justify-center text-sm">
                <label>
                  <span>Select Currency: </span>
                  <select id="currency">
                    <option value="USD">$</option>
                    <option value="EUR">€</option>
                    <option value="JPY">¥</option>
                    <option value="GBP">£</option>
                  </select>
                </label>
              </div>
              <div className="flex px-6 py-3 border border-border border-opacity-40 rounded-lg items-center justify-center text-sm">
                {/*Total Budget: 4000.00*/}
                Total Budget: 0.00
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[84%] w-full">
          <div className="w-1/4 flex flex-col items-center border-r border-border border-opacity-20 px-4">
            <BudgetListGenerator onSelectionChange={handleSelectionChange} />
          </div>
          <div className="w-3/4">
            {location.pathname === "/project/dashboard/budget" && <NoBudget />}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetLayout;
