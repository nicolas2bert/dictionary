const memBackend = require('./in_memory/backend');
const errors = require('../errors/errors');

// add config to change backend from in_memory to file.

const wrapper = {
    put: (request, log, cb) => {
        // add checks
        memBackend.put(request, log, cb);
    },
    get: (request, log, cb) => {
        // add checks
        const word = request.word;
        if (!word) {
            log('error', { message: 'no word provided in the request',
              method: 'wrapper.get' });
            return cb(errors.BadRequest);
        }
        return memBackend.get(word, log, cb);
    },
    delete: (request, log, cb) => {
        // add checks
        const word = request.word;
        if (!word) {
            log('error', { message: 'no word provided in the request',
              method: 'wrapper.delete' });
            return cb(errors.BadRequest);
        }
        return memBackend.delete(word, log, cb);
    },
};

module.exports = wrapper;
