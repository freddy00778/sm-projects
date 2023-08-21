import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import ProjectHandlers from "../data/project/ProjectHandlers";
import HighLevelPlanHandlers from "../data/highLevelPlan/HighLevelPlanHandlers";
import RiskRegisterHandlers from "../data/riskRegister/RiskRegisterHandlers";
import {unslugify} from "../utils/generalUtils";
import IssueRegisterHandlers from "../data/issueRegister/IssueRegisterHandlers";
import DecisionRegisterHandlers from "../data/decisionRegister/DecisionRegisterHandlers";



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
    const riskHandler = await RiskRegisterHandlers.create(data)
    const issueHandler = await IssueRegisterHandlers.create(data)
    const decisionHandler = await DecisionRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing project id").status(400)
        throw new Error('Missing project id');
    }

    const project = await projectHandler.get({ id })
    const riskCategory = await riskHandler.groupedByRiskCategory(id)
    const issueCategory = await issueHandler.groupedByIssueImpactLevel(id)
    const risks = await riskHandler.getAll({project_id: id, pageSize: 3})
    const issues = await issueHandler.getAll({project_id: id, pageSize: 3})
    const decisions = await decisionHandler.getAll({project_id: id, pageSize: 3})

    console.log("Issues", issues)

    const riskContent = riskCategory?.map((risk) => {
        const name = unslugify(risk.name)
        const colour = name?.includes("Highly Intolerable") ? "#F21212" :
            name?.includes("Intolerable") ? "#FF715E":
                name?.includes("ALARP") ? "#FF9900":
                    name?.includes("Maintain") ? "#FFC700": ""

        return {
            id: risk.id,
            value: name,
            number: risk.count,
            color: colour,
            textColor: "#ffffff"
        }
    })
    const issueContent = issueCategory?.map((issue) => {
        const name = unslugify(issue.name)
        const colour = name?.includes("Very High Impact") ? "#5912F2" :
            name?.includes("High Impact") ? "#6B5EFF":
                name?.includes("Medium Impact") ? "#00A3FF":
                    name?.includes("Low Impact") ? "#00FF66": ""

        return {
            id: issue.id,
            value: name,
            number: issue.count,
            color: colour,
            textColor: "#fff"
        }
    })

    const topRisks = risks?.map((risk) => {

        return {
            id: risk.id,
            value: risk.risk,

        }
    })

    const topIssues = issues?.map((risk) => {
        return {
            id: risk.id,
            value: risk.risk,
        }
    })

    const lastDecisions = decisions?.map((decision) => {
        return {
            id: decision.id,
            value: decision.top,
        }
    })

    console.log("TOP ISSUES", topIssues)


    const riskData = [
        {
            id: "1",
            topTitle: "Risk Summary",
            title: "Risk Category",
            total: "Total",
            riskContent,
        },

        {
            id: "2",
            topTitle: "Issue Summary",
            title: "Issue Classification",
            total: "Total",
            riskContent: issueContent,
        },
        {
            id: "3",
            title: "Top 3 Risks",
            riskContent: topRisks,
        },

        {
            id: "4",
            title: "Top 3 Issues",
            riskContent: topIssues
        },

        {
            id: "5",
            title: "Last 3 Project Decisions Made",
            riskContent: lastDecisions
        },

    ]

    res.respond({ project, riskCategory, riskData });
});

export const getProjectDashboard = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const projectHandler = await ProjectHandlers.create(data)
    const riskHandler = await RiskRegisterHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing project id").status(400)
        throw new Error('Missing project id');
    }

    const project = await projectHandler.get({ id })
    const riskCategory = await riskHandler.groupedByRiskCategory(id)

    console.log(riskCategory)
    res.respond({
        project,
        riskCategory
    });
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
