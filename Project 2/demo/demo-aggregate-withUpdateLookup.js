'use strict';

const common = require('./common');

(async function () {
    const collection = await common.getCollection('demo1');

    try {
        const cursor = await collection.aggregate([{
            $changeStream: { fullDocument: 'updateLookup' }
        }]);

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            common.prettyDoc(doc);
        }
    } catch (err) {
        console.log(err.stack);
    }
})()
