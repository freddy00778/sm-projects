import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import StakeholderHandlers from "../data/stakeholder/StakeholderHandlers";
import KeyChangeDepartmentHandlers from "../data/keychangeDepartment/KeyChangeDepartmentHandlers";
import StakeholderChangeDriverDepartmentHandlers
    from "../data/stakeholderChangeDriverDepartment/StakeholderChangeDriverDepartmentHandlers";
import AffectedStakeholderDepartmentHandlers
    from "../data/affectedStakeholderDepartment/AffectedStakeholderDepartmentHandlers";
import AffectedStakeholderHandlers from "../data/affectedStakeholder/AffectedStakeholderHandlers";


export const getStakeholders = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const stakeholderHandler = await StakeholderHandlers.create(data)

    console.log("Body", req.query)

    let stakeholders;

    if (req.query.id){
        stakeholders = await stakeholderHandler.getAll({key_change_id: req.query.id?.toString()});
    }else {
        stakeholders = await stakeholderHandler.getAll({});
    }

    res.respond({ data: stakeholders });
});

export const getAffectedStakeholders = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const affectedStakeholderHandler = await AffectedStakeholderHandlers.create(data)

    console.log("Body", req.query)

    let stakeholders;

    if (req.query.id){
        stakeholders = await affectedStakeholderHandler.getAll({key_change_id: req.query.id?.toString()});
    }else {
        stakeholders = await affectedStakeholderHandler.getAll({});
    }

    res.respond({ data: stakeholders });
});

export const getStakeholder = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const stakeholderHandler = await StakeholderHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing stakeholder id").status(400)
        throw new Error('Missing stakeholder id');
    }

    const keyChangeId = req.query ? {key_change_id: id} : {id}
    const stakeholder = await stakeholderHandler.get(keyChangeId )

    res.respond({ stakeholder });
});

export const addStakeholder = catchErrors(async (req, res) => {
    const stakeholderData = req.body;

// Validate incoming request body
    if (!stakeholderData || !stakeholderData.selectedOptions || !stakeholderData.impacted_parties) {
        return res.status(400).send("Invalid or missing stakeholder data");
    }

    // console.log(stakeholderData)

    try {
        const data = await DataProvider.create();
        const stakeholderHandler = await StakeholderHandlers.create(data);
        const keyChangeDepartmentHandler = await KeyChangeDepartmentHandlers.create(data);

        const keyChangeDeparmentSelectedOptions = stakeholderData.selectedOptions;
        const stakeholders = stakeholderData.impacted_parties;

        await keyChangeDepartmentHandler.deleteKeyChangeDepartment({
            key_change_id: req.body.key_change_id
        })
        for (let keyChangeDepartment of keyChangeDeparmentSelectedOptions) {
            console.log("key change department ", keyChangeDepartment)
            console.log("key change change ", stakeholderData.key_change_id)
            const keyExists = await keyChangeDepartmentHandler.get({
                department_id: keyChangeDepartment?.value,
                key_change_id: stakeholderData.key_change_id
            })

            if (!keyExists) {
            await keyChangeDepartmentHandler.insert({
                    key_change_id: stakeholderData.key_change_id,
                    department_id:  keyChangeDepartment.value,
                });
            }
        }

        for (let stakeholder of stakeholders) {
            if (!stakeholder?.id) {
                await stakeholderHandler.insert({
                    key_change_id: stakeholderData.key_change_id,
                    impacted_parties: stakeholder,
                    project_id: stakeholderData?.project_id,
                    necessary_information: stakeholderData?.necessary_information
                });
            }else{
                await stakeholderHandler.update({
                    id: stakeholder.id,
                    key_change_id: stakeholderData.key_change_id,
                    impacted_parties: stakeholder,
                    project_id: stakeholderData?.project_id,
                    necessary_information: stakeholderData?.necessary_information
                });
            }
        }

        return res.status(200).send({ status: "Success", data: stakeholderData });

    } catch (error) {
        console.error("Error processing stakeholder data:", error);
        return res.status(500).send("Internal server error");
    }



    // const stakeholder = await stakeholderHandler.insert(stakeholderData);
    // res.respond({ stakeholder });
})

export const insertSingleStakeholder = catchErrors(async (req, res) => {
    const stakeholderData = req.body;

    if (!stakeholderData) {
        return res.status(400).send("Invalid or missing stakeholder data");
    }

    try {
        const data = await DataProvider.create();
        const stakeholderHandler = await StakeholderHandlers.create(data);
        await stakeholderHandler.insert({
            key_change_id: stakeholderData.key_change_id,
            impacted_parties: req.body.impacted_parties,
            project_id: stakeholderData?.project_id,
            necessary_information: stakeholderData?.necessary_information
        });

        return res.status(200).send({ status: "Success", data: stakeholderData });

    } catch (error) {
        console.error("Error processing stakeholder data:", error);
        return res.status(500).send("Internal server error");
    }

    // const stakeholder = await stakeholderHandler.insert(stakeholderData);
    // res.respond({ stakeholder });
})

export const addChangeDriverDepartments = catchErrors(async (req, res) => {
    const stakeholderData = req.body;

    if (!stakeholderData) {
        return res.status(400).send("Invalid or missing stakeholder data");
    }

    try {
        const data = await DataProvider.create();
        const StakeholderChangeDriverDepartmentHandler = await StakeholderChangeDriverDepartmentHandlers.create(data);

        await StakeholderChangeDriverDepartmentHandler.deleteChangeDriver({
            key_change_id: stakeholderData.key_change_id
        })
        for (const dpt of req.body.departmentIds){
            await StakeholderChangeDriverDepartmentHandler.insert({
                department_id: dpt.value,
                key_change_id: stakeholderData.key_change_id,
                project_id: stakeholderData?.project_id
        });
        }

        return res.status(200).send({ status: "Success" });

    } catch (error) {
        console.error("Error processing stakeholder data:", error);
        return res.status(500).send("Internal server error");
    }
})

export const addAffectedStakeholderDepartments = catchErrors(async (req, res) => {
    const stakeholderData = req.body;

    if (!stakeholderData) {
        return res.status(400).send("Invalid or missing stakeholder data");
    }

    try {
        const data = await DataProvider.create();
        const affectedStakeholderDepartmentHandler = await AffectedStakeholderDepartmentHandlers.create(data);

        await affectedStakeholderDepartmentHandler.deleteChangeDriver({
            key_change_id: stakeholderData.key_change_id
        })
        for (const dpt of req.body.departmentIds){
            await affectedStakeholderDepartmentHandler.insert({
                department_id: dpt.value,
                key_change_id: stakeholderData.key_change_id,
                project_id: stakeholderData?.project_id
        });
        }

        return res.status(200).send({ status: "Success" });

    } catch (error) {
        console.error("Error processing stakeholder data:", error);
        return res.status(500).send("Internal server error");
    }
})

export const getAffectedStakeholderDepartments = catchErrors(async (req, res) => {
    const stakeholderData = req.body;

    if (!stakeholderData) {
        return res.status(400).send("Invalid or missing stakeholder data");
    }

    try {
        const data = await DataProvider.create();
        const affectedStakeholderDepartmentHandler = await AffectedStakeholderDepartmentHandlers.create(data);
        const queryObject = req.query.id ? {key_change_id : req.query.id} : {}
        //@ts-ignore
        const affectedStakeholderDepartments = affectedStakeholderDepartmentHandler.getAll(queryObject)

        return res.status(200).send({ status: "Success" });

    } catch (error) {
        console.error("Error processing stakeholder data:", error);
        return res.status(500).send("Internal server error");
    }
})

export const addAffectedStakeholder = catchErrors(async (req, res) => {
    const stakeholderData = req.body;

    if (!stakeholderData) {
        return res.status(400).send("Invalid or missing stakeholder data");
    }

    try {
        const data = await DataProvider.create();
        const affectedStakeholderHandler = await AffectedStakeholderHandlers.create(data);

            await affectedStakeholderHandler.insert({
                name: stakeholderData.name,
                key_change_id: stakeholderData.key_change_id,
                project_id: stakeholderData?.project_id
        });

        return res.status(200).send({ status: "Success" });

    } catch (error) {
        console.error("Error processing stakeholder data:", error);
        return res.status(500).send("Internal server error");
    }
})


export const updateStakeholder = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const stakeholderHandler = await StakeholderHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;


    if (!id || !updateData) {
        res.send("Missing stakeholder id or update data").status(400)
        throw new Error('Missing stakeholder id or update data');
    }

    const stakeholder = await stakeholderHandler.update({ ...updateData, id })

    res.respond({ stakeholder });
});

export const deleteStakeholder = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const stakeholderHandler = await StakeholderHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing stakeholder id").status(400)
        throw new Error('Missing stakeholder id');
    }

    await stakeholderHandler.deleteStakeholder({ id })

    res.respond({ message: 'Stakeholder deleted successfully' });
});
