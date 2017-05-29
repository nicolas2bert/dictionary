const utils = require('./utils');
const UserDB = require('./UserDB');
const authJson = require('../../auth.json');
const CheckHeaders = require('./CheckHeaders');
const errors = require('../errors/errors');

const userDB = new UserDB(authJson);
const generateSignature = utils.generateSignature;

module.exports = {
    auth(req, log, cb) {
        const checkHeaders = new CheckHeaders(req.headers, log);
        const checkAllHeaders = checkHeaders.checkAllHeaders();
        if (checkAllHeaders.error) {
            return cb(checkAllHeaders.error);
        }
        const accessKeyFromReq = checkHeaders.getAccessKey();
        const userData = userDB.getByAccessKey(accessKeyFromReq);
        if (!userData) {
            log('error', { message: 'User does not exist',
              method: 'auth/auth' });
            return cb(errors.BadRequest);
        }
        const signatureConstruct = generateSignature(userData.secretKey,
          req.methodUpperCase, req.pathname);
        if (checkHeaders.getSignature() !== signatureConstruct) {
            log('error', { message: 'Server failed to authenticate the ' +
            'request. Make sure the value of the Authorization header is ' +
            'formed correctly including the signature.', method: 'auth/auth' });
            return cb(errors.Forbidden);
        }
        return cb();
    },
};
