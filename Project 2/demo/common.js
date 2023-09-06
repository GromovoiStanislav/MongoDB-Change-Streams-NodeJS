'use strict';

const { MongoClient } = require('mongodb');

class Common {
    static async connect() {
        return await MongoClient.connect('mongodb://localhost/?replSet=r1');
    }

    /**
     * Gets a named collection
     * @method
     * @param {string} collectionName Collection name
     * @return {Collection} 
     */
    static async getCollection(collectionName) {
        const client = await Common.connect();
        
        return client.db('test').collection(collectionName);
    }


    /** 
     * Prints formatted JSON to the console.
     * @method
     * @param {string} doc Object to print.  
     * @return {string}
     */
    static prettyDoc(doc) {
        const result = JSON.stringify(doc, null, 2);
        console.log(result);
        return result;
    }
}



module.exports = Common;