'use strict';
const common = require('./common');
const Consumer = require('./consumer');

const genericConsumer = new Consumer("generic");
const TimestampManager = require('./timestamp-manager');

(async function () {

    try {
        const timestampManager = new TimestampManager();

        var resumePoint = timestampManager.load();

        const collection = await common.getCollection('opTimeDemo');

        const cursor = await collection.aggregate([{
            $changeStream: {
                startAtOperationTime: resumePoint
            }
        }]);

        while (await cursor.hasNext()) {
            let event = await cursor.next();
            genericConsumer.process(event);
            timestampManager.save(event.clusterTime);
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
})();