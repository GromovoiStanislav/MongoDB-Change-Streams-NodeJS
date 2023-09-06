'use strict';
const TOKEN_FILE_NAME = "./_timestamp_.txt";
const common = require('./common');

const {
    Timestamp
} = require('bson');
const fs = require('fs');

class TimestampManager {
    save(value) {
        if (!value) {
            return;
        }

        this.current = value;
        fs.writeFileSync(TOKEN_FILE_NAME, value.toString(), 'utf8');
    }

    load() {
        if (!fs.existsSync(TOKEN_FILE_NAME)) {
            return null;
        }

        this.current = Timestamp.fromString(fs.readFileSync(TOKEN_FILE_NAME, 'utf8'));
        return this.current;
    }
    get current() {
        return this._value;
    }
    set current(value) {
        this._value = value;
    }

    async firstValid() {
        const client = await common.connect();

        const oplog = client.db('local').collection('oplog.rs');

        const firstOplogEntry = await oplog.find({}).sort({
            '$natural': 1
        }).limit(1).next();

        return firstOplogEntry.ts.add(Timestamp.ONE);
    }
}

module.exports = TimestampManager;