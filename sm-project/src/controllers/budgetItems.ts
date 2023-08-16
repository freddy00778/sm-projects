import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import BudgetItemHandlers from "../data/budgetItem/BudgetItemHandlers";

export const getBudgetItems = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetItemHandler = await BudgetItemHandlers.create(data)

    console.log("Body", req.query)
    const budgetItems = await budgetItemHandler.getAll({})
    res.respond({ data: budgetItems });
});

export const getBudgetItem = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetItemHandler = await BudgetItemHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing budget item id").status(400)
        throw new Error('Missing budget item id');
    }
    const type = req.query.type ? {project_id: req.params.id} : {id}
    const budgetItem = await budgetItemHandler.get(type )

    res.respond({ data: budgetItem });
});

export const addBudgetItem = catchErrors(async (req, res) => {
    const budgetItemData = req.body;

    if (!budgetItemData) {
        res.status(400).send("Missing budget item data");
        throw new Error('Missing budget item data');
    }

    const data = await DataProvider.create();
    const budgetItemHandler = await BudgetItemHandlers.create(data);
    // const budgetItemExists = await budgetItemHandler.get({project_id: req.body.project_id})

    let budgetItem;

    // if (budgetItemExists){
    //     budgetItem = await budgetItemHandler.update({
    //         id: budgetItemExists?.id,
    //         ...req.body
    //     })
    // }else{
        budgetItem = await budgetItemHandler.insert(budgetItemData);
    // }

    res.respond({ data: budgetItem });
})

export const updateBudgetItem = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetItemHandler = await BudgetItemHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing budget item id or update data").status(400)
        throw new Error('Missing budget item id or update data');
    }

    const budgetItem = await budgetItemHandler.update({ ...updateData, id })

    res.respond({ budgetItem });
});

export const deleteBudgetItem = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const budgetItemHandler = await BudgetItemHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing budget item id").status(400)
        throw new Error('Missing budget item id');
    }

    await budgetItemHandler.deleteBudgetItem({ id })

    res.respond({ message: 'Budget item deleted successfully' });
});
