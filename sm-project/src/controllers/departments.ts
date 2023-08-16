import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import CategoryHandlers from "../data/category/CategoryHandlers";
import DepartmentHandlers from "../data/department/DepartmentHandlers";

export const getDepartments = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const departmentHandler = await DepartmentHandlers.create(data)
    console.log("Body", req.params)

    // const {name} = req.params

    const departments = await departmentHandler.getAll({})

    res.respond({
        data: departments
    });
});

export const getDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const departmentHandler = await DepartmentHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing department id").status(400)
        throw new Error('Missing department id');
    }

    const department = await departmentHandler.get({ id })

    res.respond({ data : department });
});

export const addDepartment = catchErrors(async (req, res) => {
    const departmentData = req.body;

    if (!departmentData) {
        res.status(400).send("Missing category data");
        throw new Error('Missing category data');
    }

    const data = await DataProvider.create();
    const departmentHandler = await DepartmentHandlers.create(data);

    const department = await departmentHandler.insert(departmentData);
    res.respond({ data: department });
})


export const updateDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const departmentHandler = await CategoryHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing department id or update data").status(400)
        throw new Error('Missing department id or update data');
    }

    const department = await departmentHandler.update({ ...updateData, id })

    res.respond({ data: department });
});

export const deleteDepartment = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const departmentHandler = await DepartmentHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400)
        throw new Error('Missing category id');
    }

    await departmentHandler.deleteCategory({ id })

    res.respond({ message: 'Category deleted successfully' });
});
