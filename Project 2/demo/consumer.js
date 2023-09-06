'use strict';
const common = require('./common');

class Consumer {
    /**
     * Constructor
     * @param {string} topic 
     */
    constructor(topic, detailed = true) {
        this.topic = topic;
        this.detailed = detailed;
    }

    process(evt) {
        console.log(`*** Processor "${this.topic}" got operationType ${evt.operationType} ***`)
    
        if (this.detailed) { common.prettyDoc(evt.fullDocument); }
    }
}

module.exports = Consumer;