const api = require('../api/api');
const routesUtils = require('./routesUtils');
const apiCall = api.apiCall;

module.exports = function routeDelete(req, res, log) {
    if (req.pathnameApi === 'definition') {
        apiCall('deleteDefinition', req, log, (err, json) => {
            return routesUtils.serverResponse(err, json, res);
        });
    }
    // if (req)
};
