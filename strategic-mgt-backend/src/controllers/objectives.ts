import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import ObjectiveHandlers from "../data/objective/ObjectiveHandlers";
import BenefitHandlers from "../data/benefit/BenefitHandlers";
import ObjectiveBenefitHandlers from "../data/objectiveBenefit/ObjectiveBenefitHandlers";
// import omit from  "omit"


export const getObjectives = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveHandler = await ObjectiveHandlers.create(data)

    console.log("Body", req.query)
    const objectives = await objectiveHandler.getAll({ })
    res.respond({ data: objectives });
});

export const getObjective = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveHandler = await ObjectiveHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing objective id").status(400)
        throw new Error('Missing objective id');
    }

    const objectiveId = req.query ? {key_change_id: id} : {id}
    const objective = await objectiveHandler.get(objectiveId)

    res.respond({ objective });
});

export const addObjective = catchErrors(async (req, res) => {
    const objectiveData = req.body;

    if (!objectiveData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }

    const data = await DataProvider.create();

    const objectiveHandler = await ObjectiveHandlers.create(data);
    const objectiveExists = await objectiveHandler.get({key_change_id: req.body.key_change_id})
    let objective;
    if (objectiveExists){
        objective = await objectiveHandler.update({
            id: objectiveExists?.id,
            desired_out_come: req.body.desired_out_come,
            implementation_risk: req.body.implementation_risk,
            project_id: req.body.project_id,
            key_change_id: req.body.key_change_id
        })
    }else{
         objective = await objectiveHandler.insert({
             desired_out_come: req.body.desired_out_come,
             implementation_risk: req.body.implementation_risk,
             project_id: req.body.project_id,
             key_change_id: req.body.key_change_id
         });
    }

    if (req.body.benefits){
        const benefitHandler = await BenefitHandlers.create(data)
        const objectiveBenefitHandler = await ObjectiveBenefitHandlers.create(data)
        const benefits = req.body.benefits

        // const benefitExists = objectiveBenefitHandler.get({objective_id: objective?.id })

        for (const bnft of benefits){
            // @ts-ignore
            let benefitInserted
            if (bnft.id === ""){
                 benefitInserted = await benefitHandler.insert({
                    change_benefit: bnft.content,
                    measured_benefit: bnft.details
                })
            }else{
                benefitInserted = await benefitHandler.update({
                    id: bnft?.id,
                    change_benefit: bnft.content,
                    measured_benefit: bnft.details
                })
            }

            console.log("Benefit inserted", benefitInserted)
            console.log("Benefit inserted", bnft?.id)

            if (!bnft?.id){
                await objectiveBenefitHandler.insert({
                    benefit_id:  benefitInserted?.id,
                    objective_id: objective?.id,
                    key_change_id: req.body.key_change_id

                })
            }else{
                // const objectiveBenefitHandlerExists = await objectiveBenefitHandler.get({benefit_id: benefitInserted?.id, objective_id: objective?.id})
                // if (!objectiveBenefitHandlerExists){
                //     await objectiveBenefitHandler.insert({
                //         benefit_id:  benefitInserted?.id,
                //         objective_id: objective?.id
                //     })
                // }
            }
        }
    }
    res.respond({ data: objective });
})


export const updateObjective = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveHandler = await ObjectiveHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing objective id or update data").status(400)
        throw new Error('Missing objective id or update data');
    }

    const objective = await objectiveHandler.update({ ...updateData, id })

    res.respond({ objective });
});

export const deleteObjective = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const objectiveHandler = await ObjectiveHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing objective id").status(400)
        throw new Error('Missing objective id');
    }

    await objectiveHandler.deleteObjective({ id })

    res.respond({ message: 'Objective deleted successfully' });
});
