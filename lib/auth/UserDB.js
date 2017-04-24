module.exports = class UserDB {
    constructor(authJson) {
        this.usersBy = {
            accessKey: {},
        };
        this._authObj = JSON.parse(JSON.stringify(authJson));
        this._build(this._authObj);
    }

    _build(authJson) {
        for (let i = 0; i < authJson.users.length; i++) {
            const user = authJson.users[i];
            const userData = {
                name: user.name,
                accessKey: user.accessKey,
                secretKey: user.secretKey,
            };
            this.usersBy.accessKey[user.accessKey] = userData;
        }
    }

    getByAccessKey(accessKey) {
        return this.usersBy.accessKey[accessKey];
    }
};
