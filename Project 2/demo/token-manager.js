'use strict';
const TOKEN_FILE_NAME = "./_resumeToken_.txt";
const {
    Binary
} = require('mongodb');
const {
    BSON
} = require('bson');
const fs = require('fs');

class TokenManager {
    save(token) {
        if (!token) {
            return;
        }

        this.current = token;
        fs.writeFileSync(TOKEN_FILE_NAME, new BSON().serialize(token));
    }

    load() {
        if (!fs.existsSync(TOKEN_FILE_NAME)) {
            return null;
        }

        const storedValue = fs.readFileSync(TOKEN_FILE_NAME);

        this.current = new BSON().deserialize(storedValue);
        return this.current;
    }
    get current() {
        return this._token;
    }
    set current(token) {
        this._token = token;
    }
}

module.exports = TokenManager;