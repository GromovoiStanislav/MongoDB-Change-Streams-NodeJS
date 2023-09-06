'use strict';
const common = require('./common');
const Consumer = require('./consumer');

const genericConsumer = new Consumer("generic");

(async function () {
   

    const partitionKey = Number(process.argv[2] || 0);

    console.log(`Handling partition # ${partitionKey} `);


    const collection = await common.getCollection('partitionDemo');

    const filter = {
        $match:
            {
                $expr: {
                    $eq: [
                        {
                            $mod:
                                [
                                    { $second: "$fullDocument.ts" },
                                    3 /* 3 partitions */
                                ]
                        },
                        partitionKey]
                }
            }
    };

    const changeStream = collection.watch([filter]);

    changeStream.on('change', event => {
        genericConsumer.process(event);
    });

    changeStream.on('error', err => {
        console.error(err);
        changeStream.close();
        throw err;
    });

})()