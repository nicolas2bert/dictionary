const url = require('url');

const utils = {};

utils.normalizeRequest = request => {
    /* eslint-disable no-param-reassign */
    request.methodUpperCase = request.method.toUpperCase();
    const urlParsed = url.parse(request.url);
    const pathSplit = urlParsed.pathname.toLowerCase().split('/');
    request.query = urlParsed.query;
    request.pathname = urlParsed.pathname.toLowerCase();
    request.pathnameApi = pathSplit[1];
    if (pathSplit[2]) {
        request.word = pathSplit[2];
    }
};

module.exports = utils;
