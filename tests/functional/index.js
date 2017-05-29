const http = require('http');
const assert = require('assert');

const authUtils = require('../../lib/auth/utils');
const generateAuthHeader = authUtils.generateAuthHeader;
const authJson = require('../../auth.json');
const UserDB = require('../../lib/auth/UserDB');
const userDB = new UserDB(authJson);
const accessKey = 'accessKey1';
const firstUser = userDB.getByAccessKey(accessKey);
const secretKey = firstUser.secretKey;

let options;

const word = 'word1';
const description = 'description1';

function createDefinition(done) {
    options.path = '/definition';
    options.method = 'PUT';
    const authorization = generateAuthHeader(accessKey, secretKey,
      options.method, options.path);
    options.headers = {
        authorization,
    };
    const data = { word, description };
    const stringifyData = JSON.stringify(data);
    const req = http.request(options);
    req.on('error', err => done(err));
    req.write(stringifyData);
    req.end(done);
}

function deleteDefinition(done) {
    options.path = `/definition/${word}`;
    options.method = 'DELETE';
    const authorization = generateAuthHeader(accessKey, secretKey,
      options.method, options.path);
    options.headers = {
        authorization,
    };
    const req = http.request(options);
    req.on('error', err => done(err));
    req.end(done);
}
describe('Testing API', () => {
    beforeEach(() => {
        options = {
            hostname: '127.0.0.1',
            port: 3000,
        };
    });
    describe('CREATE definition', () => {
        afterEach(done => deleteDefinition(done));
        it('with apropriate params', done => {
            options.path = '/definition';
            options.method = 'PUT';
            const authorization = generateAuthHeader(accessKey, secretKey,
              options.method, options.path);
            options.headers = {
                authorization,
            };
            const data = { word, description };
            const stringifyData = JSON.stringify(data);
            let rawData = '';
            const req = http.request(options, res => {
                res.on('data', chunk => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    assert.strictEqual(rawData.toString(), stringifyData);
                    return done();
                });
            });
            req.on('error', err => done(err));
            req.write(stringifyData);
            req.end();
        });
    });

    describe('GET definition', () => {
        beforeEach(done => createDefinition(done));
        afterEach(done => deleteDefinition(done));
        it('get existing definition', done => {
            options.path = `/definition/${word}`;
            options.method = 'GET';
            const authorization = generateAuthHeader(accessKey, secretKey,
              options.method, options.path);
            options.headers = {
                authorization,
            };
            let rawData = '';
            const req = http.request(options, res => {
                res.on('data', chunk => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    const rawDataString = JSON.parse(rawData.toString());
                    assert.strictEqual(rawDataString.word, word);
                    assert.strictEqual(rawDataString.description, description);
                    return done();
                });
            });
            req.on('error', err => done(err));
            req.end();
        });
    });

    describe('DELETE definition', () => {
        beforeEach(done => createDefinition(done));
        it('delete existing definition', done => {
            options.path = `/definition/${word}`;
            options.method = 'DELETE';
            const authorization = generateAuthHeader(accessKey, secretKey,
              options.method, options.path);
            options.headers = {
                authorization,
            };
            const req = http.request(options, res => {
                assert.strictEqual(res.statusCode, 200);
                done();
            });
            req.on('error', err => done(err));
            req.end();
        });
        it('delete non-existing definition', done => {
            options.path = '/definition/word2';
            options.method = 'DELETE';
            const authorization = generateAuthHeader(accessKey, secretKey,
              options.method, options.path);
            options.headers = {
                authorization,
            };
            const req = http.request(options, res => {
                assert.strictEqual(res.statusCode, 404);
                done();
            });
            req.on('error', err => done(err));
            req.end();
        });
    });
});
