import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import KeyImpactBarrierHandlers from "../data/keyImpactBarrier/KeyImpactBarrierHandlers";

export const getBarriers = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const barrierHandler = await KeyImpactBarrierHandlers.create(data)
    console.log("body", req.query)

    let barriers;

    if (req.query.key_change_id){
        barriers = (await barrierHandler.getAll({key_change_id: req.query.key_change_id?.toString()}))
    }

    const mappedBarriers = barriers.map((bar, index) => {
        return {
            No: index+1,
            ...bar
        }
    })

    res.respond({ data: mappedBarriers });
});

export const getKeyImpactBarrier = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const barrierHandler = await KeyImpactBarrierHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing key impact barrier id").status(400)
        throw new Error('Missing key impact barrier id');
    }

    const barrier = await barrierHandler.get({ id })

    res.respond({ barrier });
});

export const addKeyImpactBarrier = catchErrors(async (req, res) => {
    const barrierData = req.body;

    if (!barrierData) {
        res.status(400).send("Missing barrier data");
        throw new Error('Missing barrier data');
    }

    const data = await DataProvider.create();
    const barrierHandler = await KeyImpactBarrierHandlers.create(data)

    await barrierHandler.insert(barrierData);
    res.respond({ message : "success"});
})

export const updateKeyImpactBarrier = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const barrierHandler = await KeyImpactBarrierHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing barrier id or update data").status(400)
        throw new Error('Missing barrier id or update data');
    }

    await barrierHandler.update({ ...updateData, id })

    res.respond({ message: "success" });
});

export const deleteKeyImpactBarrier = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const barrierHandler = await KeyImpactBarrierHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing key impact barrier id").status(400)
        throw new Error('Missing key impact barrier id');
    }

    await barrierHandler.deleteBarrier({ id })

    res.respond({ message: 'Key impact barrier deleted successfully' });
});
