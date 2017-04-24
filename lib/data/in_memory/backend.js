const errors = require('../../errors/errors');

const definition = new Map();
let parsedData;

const backend = {
    put: (request, log, callback) => {
        let putData = '';
        request.on('data', data => {
            putData = putData + data;
        })
        .on('end', () => {
            try {
                parsedData = JSON.parse(putData.toString());
            } catch (error) {
                // only raw data as json allowed
                log('error', { message: 'unable to JSON parse your data',
                  method: 'backend.put' });
                return callback(errors.BadRequest);
            }
            definition.set(parsedData.word, parsedData.description);
            return callback(null, parsedData);
        });
    },
    get: (word, log, callback) => {
        const description = definition.get(word);
        if (!description) {
            log('error', { message: 'no description has been found', word,
              method: 'backend.get' });
            return callback(errors.NotFound);
        }
        const data = { word, description };
        return callback(null, data);
    },
    delete: (word, log, callback) => {
        const deleteDefinition = definition.delete(word);
        if (deleteDefinition) {
            return callback(null);
        }
        log('error', { message: 'definition does not exist ', word,
          method: 'backend.get' });
        return callback(errors.NotFound);
    },
};
module.exports = backend;
