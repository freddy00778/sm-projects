import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import BudgetHandlers from "../data/budget/BudgetHandlers";


export const getBudgets = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetHandler = await BudgetHandlers.create(data)

    console.log("Body", req.query)

    // let query: any = {};
    let queryObject

    console.log(req.query.type)

    if (req.query.type) {
        if (req.query.type === "project") {
            queryObject = {project_id: req.query.id}
            console.log("Query object 1", queryObject)

        } else if (req.query.type === "budget_item") {
            queryObject = {budget_item_id: req.params.id}
        }
    }

    // const query: any = req.query.type ? req.query.type === "project_id"? {project_id: req.query.project_id}: req.query.type === "budget_item" ?  {budget_item_id: req.params.id}: {} : {}
    console.log("Query", req.params)
    const budgets = await budgetHandler.getAll(queryObject)
    res.respond({ data: budgets });
});

export const getBudget = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetHandler = await BudgetHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing budget id").status(400)
        throw new Error('Missing budget id');
    }
    const type = req.query.type ? {budget_item_id: req.params.id} : {id: req.params.id}
    const budget = await budgetHandler.get(type )

    res.respond({ data: budget });
});

export const addBudget = catchErrors(async (req, res) => {
    const budgetData = req.body;

    if (!budgetData) {
        res.status(400).send("Missing budget data");
        throw new Error('Missing budget data');
    }

    const data = await DataProvider.create();
    const budgetHandler = await BudgetHandlers.create(data);
    const budgetExists = await budgetHandler.get({budget_item_id: req.body.budget_item_id})

    let budget;

    if (budgetExists){
        budget = await budgetHandler.update({
            id: budgetExists?.id,
            ...req.body
        })
    }else{
        budget = await budgetHandler.insert(budgetData);
    }

    res.respond({ data: budget });
})

export const updateBudget = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetHandler = await BudgetHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing budget id or update data").status(400)
        throw new Error('Missing budget id or update data');
    }

    const budget = await budgetHandler.update({ ...updateData, id })

    res.respond({ budget });
});

export const deleteBudget = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetHandler = await BudgetHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing budget id").status(400)
        throw new Error('Missing budget id');
    }

    await budgetHandler.deleteBudget({ id })

    res.respond({ message: 'Budget deleted successfully' });
});

