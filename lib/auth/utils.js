const crypto = require('crypto');
module.exports = {
    generateAuthHeader(accessKey, secretKey,
        HttpVerb, url) {
        const concatenation = `${HttpVerb}+${url}`;
        const digest = crypto.createHmac('sha256', secretKey)
          .update(concatenation).digest('base64');
        return `N2B ${accessKey}:${digest}`;
    },
};
