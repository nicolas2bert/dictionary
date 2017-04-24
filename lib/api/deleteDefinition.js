const wrapper = require('../data/wrapper');
module.exports = function deleteDefinition(req, log, cb) {
    wrapper.delete(req, log, cb);
    return cb();
};
