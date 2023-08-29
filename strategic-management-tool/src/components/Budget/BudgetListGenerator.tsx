// @ts-nocheck


import BudgetDropdown from "./BudgetDropdown";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {budgetActions, budgetItemActions} from "../../_store";
import Loader from "../Loader";

interface BudgetListGeneratorProps {
    onSelectionChange: (options: DropdownOption[]) => void;
}

const BudgetListGenerator: React.FC<BudgetListGeneratorProps> = ({onSelectionChange}) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { budgets } = useSelector(state => state.budget);
    const { budgetItems } = useSelector(state => state.budgetItem);


    // Simplify state initialization
    const [budgetItemsData, setBudgetItemsData] = useState<DropdownOption[]>([]);
    const [selectedBudgetItems, setSelectedBudgetItems] = useState<DropdownOption[]>([]);

    useEffect(() => {
        // Dispatch action on component mount
        dispatch(budgetItemActions.getBudgetItems());
        dispatch(budgetActions.getBudgetsByProjectId({id: user?.project_id}))

    }, [dispatch]); // Ensure dispatch is a dependency

    useEffect(() => {
        // Map budget items to DropdownOptions
        const mappedBudgetItems = budgetItems?.data?.map(({id, name}) => ({
            id,
            title: name,
            route: `/project/dashboard/budget/${id}`,
        }));

        setBudgetItemsData(mappedBudgetItems);
    }, [budgetItems]); // Ensure budgetItems is a dependency

    useEffect(() => {
        const mappedBudgetItems = budgets?.data?.map(({budget_item_id, name}) => ({
            id: budget_item_id,
            title: name,
            route: `/project/dashboard/budget/${budget_item_id}`,
        }));

        setSelectedBudgetItems(mappedBudgetItems);
    }, [budgets]); // Ensure budgetItems is a dependency


    return (
        <div className="flex flex-col w-full h-full items-center py-4">
            <BudgetDropdown
                selectedBudgetItems = {selectedBudgetItems}
                options={budgetItemsData}
                onSelectionChange={onSelectionChange}
            />

        </div>
    );
};

export default BudgetListGenerator;
