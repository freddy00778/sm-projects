import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import BenefitHandlers from "../data/benefit/BenefitHandlers";

export const getBenefits = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const benefitHandler = await BenefitHandlers.create(data)

    console.log("Body", req.query)
    const benefits = await benefitHandler.getAll({ })
    res.respond({ data: benefits });
});

export const getBenefit = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const benefitHandler = await BenefitHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing benefit id").status(400)
        throw new Error('Missing benefit id');
    }

    const benefit = await benefitHandler.get({ id })

    res.respond({ benefit });
});

export const addBenefit = catchErrors(async (req, res) => {
    const benefitData = req.body;

    if (!benefitData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();
    const benefitHandler = await BenefitHandlers.create(data);

    const benefit = await benefitHandler.insert(benefitData);
    res.respond({ benefit });
})

export const updateBenefit = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const benefitHandler = await BenefitHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing benefit id or update data").status(400)
        throw new Error('Missing benefit id or update data');
    }

    const benefit = await benefitHandler.update({ ...updateData, id })

    res.respond({ benefit });
});

export const deleteBenefit = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const benefitHandler = await BenefitHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing benefit id").status(400)
        throw new Error('Missing benefit id');
    }

    await benefitHandler.deleteBenefit({ id })

    res.respond({ message: 'Benefit deleted successfully' });
});
