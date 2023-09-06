'use strict';

const common = require('./common');
const Consumer = require('./consumer');
const campaign = new Consumer("campaign");


(async function () {

    try {
        const collection = await common.getCollection('cart');

        const cursor = await collection.aggregate([
            { $changeStream: { fullDocument: 'updateLookup' } },

            {
                $match:
                    {
                        'fullDocument.customer': { $exists: true },
                        'operationType': 'update',
                        'updateDescription.updatedFields.customer': { $exists: true },
                    }
            },
            {
                $project: { "fullDocument.note": 0 }
            }
        ]);

        while (await cursor.hasNext()) {
            const event = await cursor.next();
            campaign.process(event);
        }

    } catch (err) {
        console.log(err.stack);
    }
})()