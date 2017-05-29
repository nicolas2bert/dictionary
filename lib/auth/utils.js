const crypto = require('crypto');
const utils = {
    generateSignature(secretKey, HttpVerb, pathname) {
        const concatenation = `${HttpVerb}+${pathname}`;
        return crypto.createHmac('sha256', secretKey)
          .update(concatenation).digest('base64');
    },
    generateAuthHeader(accessKey, secretKey, HttpVerb, pathname) {
        const digest = utils.generateSignature(secretKey, HttpVerb, pathname);
        return `N2B ${accessKey}:${digest}`;
    },
};

module.exports = utils;
