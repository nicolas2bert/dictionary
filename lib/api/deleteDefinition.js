const wrapper = require('../data/wrapper');
module.exports = function deleteDefinition(req, log, cb) {
    return wrapper.delete(req, log, cb);
};
