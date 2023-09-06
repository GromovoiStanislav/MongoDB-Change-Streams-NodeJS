'use strict';

const common = require('./common');

(async function () {

    try {
        const collection = await common.getCollection('demo1');

        const cursor = await collection.aggregate([
            { $changeStream: { fullDocument: 'updateLookup' } },
            { $project: {"total": {$add: ["$price", "$tax"]}} }]);

        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            common.prettyDoc(doc);
        }

    } catch (err) {
        console.log(err.stack);
    }
})()