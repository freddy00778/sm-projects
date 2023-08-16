import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import ObjectiveBenefitHandlers from "../data/objectiveBenefit/ObjectiveBenefitHandlers";

export const getObjectiveBenefits = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveBenefitHandler = await ObjectiveBenefitHandlers.create(data)

    console.log("Body", req.query)
    const queryObject: any = req.query ? {key_change_id: req.query.id}: {}
    const objectiveBenefits = await objectiveBenefitHandler.getAll(queryObject)
    res.respond({ data: objectiveBenefits });
});

export const getObjectiveBenefit = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveBenefitHandler = await ObjectiveBenefitHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing objective benefit id").status(400)
        throw new Error('Missing objective benefit id');
    }

    const objectiveBenefit = await objectiveBenefitHandler.get({ id })

    res.respond({ objectiveBenefit });
});

export const addObjectiveBenefit = catchErrors(async (req, res) => {
    const objectiveBenefitData = req.body;

    if (!objectiveBenefitData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();
    const objectiveBenefitHandler = await ObjectiveBenefitHandlers.create(data);

    const objectiveBenefit = await objectiveBenefitHandler.insert(objectiveBenefitData);
    res.respond({ objectiveBenefit });
})

export const updateObjectiveBenefit = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveBenefitHandler = await ObjectiveBenefitHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing objective benefit id or update data").status(400)
        throw new Error('Missing objective benefit id or update data');
    }

    const objectiveBenefit = await objectiveBenefitHandler.update({ ...updateData, id })

    res.respond({ objectiveBenefit });
});

export const deleteObjectiveBenefit = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveBenefitHandler = await ObjectiveBenefitHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing objective benefit id").status(400)
        throw new Error('Missing objective benefit id');
    }

    await objectiveBenefitHandler.deleteBenefit({ id })

    res.respond({ message: 'Objective benefit deleted successfully' });
});
