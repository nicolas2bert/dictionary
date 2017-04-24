const wrapper = require('../data/wrapper');
module.exports = function getDefinition(req, log, cb) {
    wrapper.get(req, log, cb);
    return cb();
};
