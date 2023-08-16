import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import ScopeHandlers from "../data/scope/ScopeHandlers";


export const getScopes = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const scopeHandler = await ScopeHandlers.create(data)

    console.log("Body", req.query)
    const queryParameterObject: any = req.query.project_id ? {project_id: req.query.project_id} : {}

    const scopes = await scopeHandler.getAll(queryParameterObject)
    res.respond({ data: scopes });
});

export const getScope = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const scopeHandler = await ScopeHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing scope id").status(400)
        throw new Error('Missing scope id');
    }

    const scope = await scopeHandler.get({ id })

    res.respond({ scope });
});

export const addScope = catchErrors(async (req, res) => {
    const scopeData = req.body;

    if (!scopeData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();
    const scopeHandler = await ScopeHandlers.create(data);

    const scope = await scopeHandler.insert(scopeData);
    res.respond({ scope });
})


export const updateScope = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const scopeHandler = await ScopeHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing scope id or update data").status(400)
        throw new Error('Missing scope id or update data');
    }

    const scope = await scopeHandler.update({ ...updateData, id })

    res.respond({ scope });
});

export const deleteScope = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const scopeHandler = await ScopeHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing scope id").status(400)
        throw new Error('Missing scope id');
    }

    await scopeHandler.deleteScope({ id })

    res.respond({ message: 'Scope deleted successfully' });
});
