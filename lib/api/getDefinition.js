const wrapper = require('../data/wrapper');
module.exports = function getDefinition(req, log, cb) {
    return wrapper.get(req, log, cb);
};
