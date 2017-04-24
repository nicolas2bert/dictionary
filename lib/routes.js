const utils = require('./utils');
const routeGet = require('./routes/routeGet');
const routePut = require('./routes/routePut');
const routeDelete = require('./routes/routeDelete');
// const routeHead = require('./routes/routeHead');
// const routePost = require('./routes/routePost');
// const routeOptions = require('./routes/routeOption');
//
const mapRouting = {
    GET: routeGet,
    PUT: routePut,
    DELETE: routeDelete,
//     HEAD: routeHead,
//     POST: routePost,
//     OPTIONS: routeOptions,
};

module.exports = function routes(req, res, log) {
    const method = req.method.toUpperCase();
    utils.normalizeRequest(req);
    const clientInfo = {
        clientIP: req.socket.remoteAddress,
        clientPort: req.socket.remotePort,
        httpMethod: req.method,
        httpURL: req.url,
    };
    log('info', clientInfo);
    mapRouting[method](req, res, log);
   // const httpMethod = req.
};
