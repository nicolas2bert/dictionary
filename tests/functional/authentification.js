const http = require('http');
const assert = require('assert');

let options;

const word = 'word1';
const description = 'description1';
const accessKey = 'accessKey1';

const authorizations = [
  { name: 'N2B', err: 'Bad Request' },
  { name: 'N2B invalid', err: 'Bad Request' },
  { name: `N2B ${accessKey}:invalid`, err: 'Forbidden' },
  { name: 'N2B invalid:invalid', err: 'Bad Request' },
  { name: 'N2B invalid:invalid:invalid', err: 'Bad Request' },
];

describe('Testing authentication', () => {
    beforeEach(() => {
        options = {
            hostname: '127.0.0.1',
            port: 3000,
        };
    });
    describe('Invalid authorization header:', () => {
        authorizations.forEach(authorization => {
            it(`${authorization.name} should return ${authorization.err}`,
            done => {
                options.path = '/definition';
                options.method = 'PUT';
                options.headers = {
                    authorization: authorization.name,
                };
                const data = { word, description };
                const stringifyData = JSON.stringify(data);
                let rawData = '';
                const req = http.request(options, res => {
                    res.on('data', chunk => {
                        rawData += chunk;
                    });
                    res.on('end', () => {
                        const error = JSON.parse(rawData.toString());
                        assert.strictEqual(error.errors[0].internalMessage,
                          authorization.err);
                        return done();
                    });
                });
                req.on('error', err => done(err));
                req.write(stringifyData);
                req.end();
            });
        });
    });
});
