import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import ProjectHandlers from "../data/project/ProjectHandlers";
import HighLevelPlanHandlers from "../data/highLevelPlan/HighLevelPlanHandlers";



export const getProjects = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const projectHandler = await ProjectHandlers.create(data)

    console.log("Body", req.query)
    const queryParameterObject: any = req.query.project_id ? {organisation_id: req.query.org_id} : {}

    const projects = await projectHandler.getAll(queryParameterObject)
    res.respond({ data: projects });
});

export const getProgress = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const projectHandler = await ProjectHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing project id").status(400)
        throw new Error('Missing project id');
    }

    const project = await projectHandler.get({ id })

    res.respond({ project });
});

export const addProject = catchErrors(async (req, res) => {
    const projectData = req.body;

    console.log("Project data", projectData)

    if (!projectData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();
    const projectHandler = await ProjectHandlers.create(data);
    const highLevelPlanHandler = await HighLevelPlanHandlers.create(data);

    const project = await projectHandler.insert(projectData);

    if(project){
        const steps = ['first_step', 'second_step', 'third_step', 'fourth_step'];

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            if(req.body[step]){
                await highLevelPlanHandler.insert({
                    project_id: project?.id,
                    description: req.body[step],
                    order: i + 1
                });
            }
        }
    }

    res.respond({ project });
})


export const updateProject = catchErrors(async (req, res) => {
    const omit = require("omit")
    const data = await DataProvider.create()
    const projectHandler = await ProjectHandlers.create(data)
    const highLevelPlanHandler = await HighLevelPlanHandlers.create(data);

    const id = req.body.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing project id or update data").status(400)
        throw new Error('Missing project id or update data');
    }

    const projectBody = omit(["first_step","second_step","third_step","fourth_step"], req.body)
    const project = await projectHandler.update({ ...projectBody, id })

    if(project){
        const steps = ['first_step', 'second_step', 'third_step', 'fourth_step'];
        await highLevelPlanHandler.deletePlan({id: project?.id})
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            if(req.body[step]){
                await highLevelPlanHandler.insert({
                    project_id: project?.id,
                    description: req.body[step],
                    order: i + 1
                });
            }
        }
    }

    res.respond({ project });
});

export const deleteProgress = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const projectHandler = await ProjectHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing project id").status(400)
        throw new Error('Missing project id');
    }

    await projectHandler.deleteProject({ id })

    res.respond({ message: 'Project deleted successfully' });
});
