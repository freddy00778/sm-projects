import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import CategoryHandlers from "../data/category/CategoryHandlers";
import HighLevelPlanHandlers from "../data/highLevelPlan/HighLevelPlanHandlers";

export const getHighLevelPlans = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const highLevelPlanHandler = await HighLevelPlanHandlers.create(data);
    console.log("Body", req.params);

    const queryParameterObject: any = req.query.project_id ? {project_id: req.query.project_id} : {}
    const highLevelPlans = await highLevelPlanHandler.getAll(queryParameterObject);

    res.respond({
        data: highLevelPlans
    });
});

export const getHighLevelPlan = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const highLevelPlanHandler = await HighLevelPlanHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send("Missing highLevelPlan id").status(400);
        throw new Error('Missing highLevelPlan id');
    }

    const highLevelPlan = await highLevelPlanHandler.get({ id });

    res.respond({ data : highLevelPlan });
});

export const addHighLevelPlan = catchErrors(async (req, res) => {
    const highLevelPlanData = req.body;

    if (!highLevelPlanData) {
        res.status(400).send("Missing category data");
        throw new Error('Missing category data');
    }

    const data = await DataProvider.create();
    const highLevelPlanHandler = await HighLevelPlanHandlers.create(data);

    const highLevelPlan = await highLevelPlanHandler.insert(highLevelPlanData);
    res.respond({ data: highLevelPlan });
})

export const updateHighLevelPlan = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const highLevelPlanHandler = await CategoryHandlers.create(data); // Be careful here, it's using CategoryHandlers, might want to change this.

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing highLevelPlan id or update data").status(400);
        throw new Error('Missing highLevelPlan id or update data');
    }

    const highLevelPlan = await highLevelPlanHandler.update({ ...updateData, id });

    res.respond({ data: highLevelPlan });
});

export const deleteHighLevelPlan = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const highLevelPlanHandler = await HighLevelPlanHandlers.create(data);

    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400);
        throw new Error('Missing category id');
    }

    await highLevelPlanHandler.deletePlan({ id });

    res.respond({ message: 'Category deleted successfully' });
});
