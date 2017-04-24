const api = require('../api/api');
const routesUtils = require('./routesUtils');
const apiCall = api.apiCall;

module.exports = function routePut(req, res, log) {
    if (req.pathnameApi === 'definition') {
        apiCall('putDefinition', req, log, (err, json) => {
            return routesUtils.serverResponse(err, json, res);
        });
    }
    // if (req)
};
