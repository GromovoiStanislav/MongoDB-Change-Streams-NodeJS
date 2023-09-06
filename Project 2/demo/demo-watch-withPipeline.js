'use strict';

const common = require('./common');
const Consumer = require('./consumer');
const CartStatus = require('./cart-status');

const analytics = new Consumer("analytics", false);


(async function () {

    try {
        const collection = await common.getCollection('cart');

        const options = { fullDocument: 'updateLookup' };

        const pipeline = [{ $match: { 'fullDocument.status': CartStatus.SHOP } }];

        const changeStream = collection.watch(pipeline, options);

        changeStream.on('change', event => {
            analytics.process(event);
        });

    } catch (err) {
        console.log(err.stack);
    }
})()