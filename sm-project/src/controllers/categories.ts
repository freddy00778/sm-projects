import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import CategoryHandlers from "../data/category/CategoryHandlers";

export const getCategories = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const categoryHandler = await CategoryHandlers.create(data)
    console.log("Body", req.params)

    // const {name} = req.params

    const categories = await categoryHandler.getAll({})

    res.respond({
        data: categories
    });
});

export const getCategory = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const categoryHandler = await CategoryHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400)
        throw new Error('Missing category id');
    }

    const category = await categoryHandler.get({ id })

    res.respond({ category });
});

export const addCategory = catchErrors(async (req, res) => {
    const categoryData = req.body;

    if (!categoryData) {
        res.status(400).send("Missing category data");
        throw new Error('Missing category data');
    }

    const data = await DataProvider.create();
    const categoryHandler = await CategoryHandlers.create(data);

    const scope = await categoryHandler.insert(categoryData);
    res.respond({ scope });
})


export const updateCategory = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const categoryHandler = await CategoryHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing category id or update data").status(400)
        throw new Error('Missing category id or update data');
    }

    const scope = await categoryHandler.update({ ...updateData, id })

    res.respond({ scope });
});

export const deleteCategory = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const categoryHandler = await CategoryHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400)
        throw new Error('Missing category id');
    }

    await categoryHandler.deleteCategory({ id })

    res.respond({ message: 'Category deleted successfully' });
});
