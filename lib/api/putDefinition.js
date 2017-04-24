const wrapper = require('../data/wrapper');

module.exports = function putDefinition(req, log, cb) {
    return wrapper.put(req, log, cb);
};
