const errors = require('../errors/errors');

module.exports = class CheckHeaders {
    constructor(headers, log) {
        this._headers = headers;
        this._log = log;
        return this;
    }
    // authorization: N2B accessKey:Signature
    _checkAuthorization(authorization, log) {
        const semicolonIndex = authorization.indexOf(':');
        if (authorization.substring(0, 3) === 'N2B') {
            this._n2b = 'N2B';
        } else {
            log('error', { message: 'The authentication information was not ' +
            'provided in the correct format. Verify the value of ' +
            'Authorization header.', method: 'CheckHeaders._checkAuthorization',
            });
            return errors.BadRequest;
        }
        this._accessKey = authorization.substring(4, semicolonIndex);
        this._signature = authorization.substring(semicolonIndex + 1);
        return null;
    }
    checkAllHeaders() {
        const headersKeys = Object.keys(this._headers);
        for (let i = 0; i < headersKeys.length; i++) {
            const key = headersKeys[i];
            if (key === 'authorization') {
                this._autorization = this._headers[key];
                const authError = this._checkAuthorization(this._autorization,
                  this._log);
                if (authError) {
                    return { error: authError };
                }
            }
        }
        return { error: null };
    }

    getAccessKey() {
        return this._accessKey;
    }
    getSignature() {
        return this._signature;
    }
};
