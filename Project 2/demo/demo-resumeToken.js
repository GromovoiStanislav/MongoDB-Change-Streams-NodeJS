'use strict';
const common = require('./common');
const TokenManager = require('./token-manager');
const Consumer = require('./consumer');

const genericConsumer = new Consumer("generic");

(async function () {

    const tokenManager = new TokenManager();

    const lastToken = tokenManager.load();

    const collection = await common.getCollection('tokenDemo');

    const changeStream = collection.watch([], { resumeAfter: lastToken });

    changeStream.on('change', event => {
        genericConsumer.process(event);
        tokenManager.save(event._id);
    });

    changeStream.on('error', err => {
        console.error(err);
        changeStream.close();
        throw err;
    });

})()