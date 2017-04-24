const utils = require('./utils');
const UserDB = require('./UserDB');
const authJson = require('../../auth.json');

const userDB = new UserDB(authJson);
const generateAuthHeader = utils.generateAuthHeader;

module.exports = {
    auth(req, log, cb) {
        const userData = userDB.getByAccessKey('accessKey1');
        console.log('userData!!!', userData);
        console.log('AUTH CHECKS!!!');
        console.log('req.headers!!!', req.headers);
        return cb();
    },
};
