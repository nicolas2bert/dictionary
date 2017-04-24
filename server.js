const http = require('http');
const routes = require('./lib/routes');
const logger = require('./lib/logger');

const server = http.createServer();

server.listen(3000);
server.on('request', (req, res) => {
    routes(req, res, logger);
});
