const deleteDefinition = require('./deleteDefinition');
const getDefinition = require('./getDefinition');
const putDefinition = require('./putDefinition');
const auth = require('../auth/auth').auth;

const api = {
    apiCall(method, req, log, cb) {
        auth(req, log, err => {
            if (err) {
                return cb(err);
            }
            return api[method](req, log, cb);
        });
    },
    getDefinition,
    deleteDefinition,
    putDefinition,
};

module.exports = api;
